import { useEffect, useRef, useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import 'react-photo-view/dist/react-photo-view.css'
import type { GalleryItem } from '../lib/images'

interface GalleryProps {
  items: GalleryItem[]
}

const frame =
  'group flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-paper p-5 shadow-xl transition duration-300 ease-out sm:p-7'
const media =
  'h-auto max-h-full w-auto max-w-full rounded-md shadow-[0_2px_12px_-4px] shadow-ink/25 transition duration-500 ease-out'

interface ZoomControlsProps {
  scale: number
  onScale: (scale: number) => void
}

const isPhoto = (target: EventTarget | null) =>
  target instanceof Element && target.closest('.PhotoView-Portal .PhotoView__Photo') !== null

// Zoom behavior for the enlarged image, rendered inside the lightbox.
// - A single click zooms in, or back out. It waits 300ms so a double-click,
//   which the lightbox already handles by zooming at the point clicked, isn't
//   also counted as two single clicks. A click that ends a drag is ignored.
// - Marks the page while zoomed and while dragging, so the cursor can show
//   zoom in, zoom out, or a hand only while the image is being moved.
const ZoomControls = ({ scale, onScale }: ZoomControlsProps) => {
  const latest = useRef({ scale, onScale })
  const zoomed = scale > 1

  useEffect(() => {
    latest.current = { scale, onScale }
  })

  useEffect(() => {
    let timer: number | undefined
    let down = { x: 0, y: 0 }
    const root = document.documentElement
    const onPointerDown = (event: PointerEvent) => {
      down = { x: event.clientX, y: event.clientY }
    }
    const onPointerMove = (event: PointerEvent) => {
      const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5
      if (event.buttons && moved && isPhoto(event.target)) root.setAttribute('data-photo-dragging', '')
    }
    const onPointerUp = () => root.removeAttribute('data-photo-dragging')
    const onClick = (event: MouseEvent) => {
      if (!isPhoto(event.target)) return
      clearTimeout(timer)
      const dragged = Math.hypot(event.clientX - down.x, event.clientY - down.y) > 5
      if (event.detail > 1 || dragged) return
      timer = window.setTimeout(() => {
        const { scale, onScale } = latest.current
        onScale(scale > 1 ? 1 : 2)
      }, 300)
    }
    // Capture phase: the lightbox stops clicks from bubbling out of it.
    document.addEventListener('pointerdown', onPointerDown, { capture: true })
    document.addEventListener('pointermove', onPointerMove, { capture: true })
    document.addEventListener('pointerup', onPointerUp, { capture: true })
    document.addEventListener('click', onClick, { capture: true })
    return () => {
      clearTimeout(timer)
      onPointerUp()
      document.removeEventListener('pointerdown', onPointerDown, { capture: true })
      document.removeEventListener('pointermove', onPointerMove, { capture: true })
      document.removeEventListener('pointerup', onPointerUp, { capture: true })
      document.removeEventListener('click', onClick, { capture: true })
    }
  }, [])

  useEffect(() => {
    document.documentElement.toggleAttribute('data-photo-zoomed', zoomed)
    return () => document.documentElement.removeAttribute('data-photo-zoomed')
  }, [zoomed])

  return null
}

interface ArrowsProps {
  index: number
  count: number
  onIndexChange: (index: number) => void
}

// The lightbox's own arrows disappear at the first and last item (and on touch
// screens), so these replace them: always shown, dimmed at either end.
const Arrows = ({ index, count, onIndexChange }: ArrowsProps) => {
  if (count < 2) return null
  const arrows = [
    { side: 'Left', label: 'Previous', to: index - 1, path: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' },
    { side: 'Right', label: 'Next', to: index + 1, path: 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z' },
  ]
  return arrows.map(({ side, label, to, path }) => (
    <button
      key={side}
      type="button"
      data-lightbox-arrow
      aria-label={label}
      disabled={to < 0 || to >= count}
      onClick={() => onIndexChange(to)}
      className={`PhotoView-Slider__Arrow${side}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" width="44" height="44">
        <path d={path} />
      </svg>
    </button>
  ))
}

type Size = { width: number; height: number }

const currentWindowSize = (): Size | null =>
  typeof window === 'undefined' ? null : { width: innerWidth, height: innerHeight }

// The window size, updated shortly after the window is resized or rotated.
// The lightbox fits images to the window itself but shows videos at the size
// it's given, so videos are fitted here.
const useWindowSize = () => {
  const [size, setSize] = useState(currentWindowSize)
  useEffect(() => {
    let timer: number | undefined
    const update = () => {
      clearTimeout(timer)
      timer = window.setTimeout(() => setSize(currentWindowSize()), 200)
    }
    addEventListener('resize', update)
    return () => {
      clearTimeout(timer)
      removeEventListener('resize', update)
    }
  }, [])
  return size
}

// Scale a video down (never up) to fit inside the window, like the lightbox
// does for images.
const fit = (width: number, height: number, window: Size | null) => {
  const scale = window ? Math.min(1, window.width / width, window.height / height) : 1
  return { width: Math.round(width * scale), height: Math.round(height * scale) }
}

// Every image and video sits in the same 4:3 frame, scaled to fit without
// cropping or upscaling, so screenshots and recordings of any shape line up.
// Both open in the lightbox; videos play on a loop, like a GIF, in both places.
const Gallery = ({ items }: GalleryProps) => {
  const windowSize = useWindowSize()
  return (
    // The lightbox only reads a video's size once, so start it fresh when the
    // window size changes.
    <PhotoProvider
      key={windowSize ? `${windowSize.width}x${windowSize.height}` : 'server'}
      overlayRender={({ scale, onScale, index, images, onIndexChange }) => (
        <>
          <ZoomControls scale={scale} onScale={onScale} />
          <Arrows index={index} count={images.length} onIndexChange={onIndexChange} />
        </>
      )}
    >
      <ul data-gallery className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.kind === 'image' ? item.full : item.src}>
            <figure>
              {item.kind === 'image' ? (
                <PhotoView src={item.full}>
                  <button
                    type="button"
                    aria-label={`View larger: ${item.alt}`}
                    className={`${frame} cursor-zoom-in hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-paper`}
                  >
                    <img
                      src={item.thumb}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className={`${media} group-hover:scale-[1.02]`}
                    />
                  </button>
                </PhotoView>
              ) : (
                <PhotoView
                  {...fit(item.width, item.height, windowSize)}
                  render={({ attrs }) => (
                    <video
                      {...attrs}
                      className="PhotoView__Photo"
                      src={item.src}
                      aria-label={item.alt}
                      autoPlay
                      muted
                      loop
                      playsInline
                      disablePictureInPicture
                    />
                  )}
                >
                  <button
                    type="button"
                    aria-label={`View larger: ${item.alt}`}
                    className={`${frame} cursor-zoom-in hover:-translate-y-1 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-paper`}
                  >
                    <video
                      src={item.src}
                      aria-hidden="true"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className={`${media} group-hover:scale-[1.02]`}
                    />
                  </button>
                </PhotoView>
              )}
              <figcaption className="mt-3 text-sm text-paper/70">{item.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </PhotoProvider>
  )
}

export default Gallery
