// Expands a project circle into its page, and shrinks the page back into its
// circle on the way home. Runs on top of Astro's <ClientRouter />, which wraps
// every navigation in a view transition; we animate the root snapshots with a
// circular clip-path that starts (or ends) at the clicked circle.

const DURATION = 700
// Fast start, soft landing.
const EASING = 'cubic-bezier(0.2, 0, 0, 1)'
// How many of each project's gallery images to load ahead of time.
const WARM_IMAGES = 4

type Kind = 'expand' | 'collapse'

interface Circle {
  x: number
  y: number
  r: number
}

let pending: { kind: Kind; slug: string } | null = null
let clickedCircle: Circle | null = null
// True when the entry before the current project page is the grid, so the
// back button can use history.back() and keep the grid's scroll position.
let gridIsPrevious = false

// While the grid sits idle, load each project's first few images into the
// browser cache. Nothing waits on this: it only means a project's images are
// already there when its page expands, instead of popping in mid-animation.
const warmed = new Set<string>()

const whenIdle = (task: () => void) =>
  'requestIdleCallback' in window ? requestIdleCallback(task, { timeout: 2000 }) : setTimeout(task, 200)

const warmProjectImages = () => {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('a[data-project-circle]')].filter(
    (link) => !warmed.has(link.href),
  )
  const next = () => {
    const link = links.shift()
    if (!link) return
    warmed.add(link.href)
    fetch(link.href)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        for (const img of [...doc.querySelectorAll<HTMLImageElement>('[data-gallery] img')].slice(0, WARM_IMAGES)) {
          new Image().src = img.getAttribute('src') ?? ''
        }
      })
      .catch(() => {})
      .finally(() => whenIdle(next))
  }
  whenIdle(next)
}

document.addEventListener('astro:page-load', () => {
  if (document.querySelector('[data-project-circle]')) warmProjectImages()
})

const projectSlug = (url: URL) => url.pathname.match(/\/projects\/([^/]+)\/?$/)?.[1] ?? null

const circleElement = (slug: string) =>
  document.querySelector(`[data-project-circle="${CSS.escape(slug)}"]`)

const circleFor = (slug: string): Circle | null => {
  const el = circleElement(slug)
  if (!el) return null
  const rect = el.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, r: rect.width / 2 }
}

// Radius that covers the whole viewport from (x, y).
const coverRadius = ({ x, y }: Circle) =>
  Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))

document.addEventListener('astro:before-preparation', (event) => {
  const from = projectSlug(event.from)
  const to = projectSlug(event.to)
  pending = null

  if (to && !from) {
    gridIsPrevious = event.direction === 'forward'
    event.direction = 'forward'
    pending = { kind: 'expand', slug: to }
    clickedCircle = circleFor(to)
  } else if (from && !to) {
    gridIsPrevious = false
    event.direction = 'back'
    pending = { kind: 'collapse', slug: from }
  }
})

document.addEventListener('astro:before-swap', (event) => {
  const transition = pending
  if (!transition || !document.startViewTransition) return

  event.viewTransition.ready
    .then(() => {
      // Collapsing: the grid is in the DOM now, with its scroll restored.
      const circle = transition.kind === 'collapse' ? circleFor(transition.slug) : clickedCircle
      if (!circle) return

      const at = `at ${circle.x}px ${circle.y}px`
      const small = `circle(${circle.r}px ${at})`
      const large = `circle(${coverRadius(circle)}px ${at})`

      // The page fades in over the start of the expansion (and out over the
      // end of the collapse) so it blends with the circle's own image.
      const keyframes =
        transition.kind === 'expand'
          ? [{ clipPath: small, opacity: 0 }, { opacity: 1, offset: 0.15 }, { clipPath: large, opacity: 1 }]
          : [{ clipPath: large, opacity: 1 }, { opacity: 1, offset: 0.85 }, { clipPath: small, opacity: 0 }]

      const animation = document.documentElement.animate(keyframes, {
        duration: DURATION,
        easing: EASING,
        fill: 'both',
        pseudoElement:
          transition.kind === 'expand' ? '::view-transition-new(root)' : '::view-transition-old(root)',
      })
      // A filled animation outlives its transition and would apply to the next
      // one's snapshots too (e.g. leaving the grid invisible behind the next
      // expanding circle), so drop it once this transition is done.
      const cancel = () => animation.cancel()
      event.viewTransition.finished.then(cancel, cancel)
    })
    .catch(() => {})
})

// On a fresh visit to the grid (e.g. after landing on a shared project link)
// the circle may be off screen; bring it into view so the page shrinks into it.
document.addEventListener('astro:after-swap', () => {
  if (pending?.kind !== 'collapse') return
  const el = circleElement(pending.slug)
  if (!el) return
  const { top, bottom } = el.getBoundingClientRect()
  if (top < 0 || bottom > innerHeight) el.scrollIntoView({ block: 'center', behavior: 'instant' })
})

// Capture phase, so this runs before <ClientRouter /> handles the link.
document.addEventListener('click', (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('a[data-back]')
  if (!link || !gridIsPrevious || event.metaKey || event.ctrlKey || event.shiftKey) return
  event.preventDefault()
  history.back()
}, { capture: true })

document.addEventListener('keydown', (event) => {
  // While an image is enlarged, Escape only closes the image.
  if (event.key !== 'Escape' || document.querySelector('.PhotoView-Portal')) return
  document.querySelector<HTMLAnchorElement>('a[data-back]')?.click()
})
