import { readFileSync } from 'node:fs'
import type { ImageMetadata } from 'astro'
import { getImage } from 'astro:assets'

// Each project keeps its media in src/assets/img/<project slug>/.
// Every matched file is published with the site, so folders and files that
// aren't on the site yet are left out. Vite needs these patterns written out
// in each call. Remove a pattern from both once it's used.
const images = import.meta.glob<{ default: ImageMetadata }>([
  '../assets/img/**/*.{png,jpg,jpeg,webp}',
  '!**/img/rafter-360/**',
  '!**/img/rafter-sourcery/**',
  '!**/img/zappos-outfit-builder/**',
  '!**/img/copper-design-system/final_colors.png',
])
const videos = import.meta.glob<string>(
  [
    '../assets/img/**/*.webm',
      '!**/img/rafter-360/**',
    '!**/img/rafter-sourcery/**',
    '!**/img/zappos-outfit-builder/**',
  ],
  { query: '?url', import: 'default' },
)

const assetPath = (slug: string, file: string) => `../assets/img/${slug}/${file}`

export const isVideo = (file: string) => file.endsWith('.webm')

/** Load an image from src/assets/img/<slug>/ by file name. */
export async function image(slug: string, file: string): Promise<ImageMetadata> {
  const load = images[assetPath(slug, file)]
  if (!load) throw new Error(`Image not found: src/assets/img/${slug}/${file}`)
  return (await load()).default
}

// Reads a .webm video's width and height from its header, so the lightbox can
// fit it to the window like an image. WebM stores them as nested elements:
// Segment > Tracks > TrackEntry > Video > PixelWidth / PixelHeight.
function videoSize(path: string): { width: number; height: number } {
  const data = readFileSync(path)
  const containers = new Set([0x18538067, 0x1654ae6b, 0xae, 0xe0])
  const size = { width: 0, height: 0 }

  // EBML numbers store their own length in the leading zero bits of the first byte.
  const readVint = (at: number, keepMarker: boolean) => {
    const first = data[at]
    let length = 1
    while (length <= 8 && !(first & (0x80 >> (length - 1)))) length++
    let value = keepMarker ? first : first & (0xff >> length)
    for (let i = 1; i < length; i++) value = value * 256 + data[at + i]
    return { value, length }
  }

  const walk = (start: number, end: number) => {
    let at = start
    while (at < end && !(size.width && size.height)) {
      const id = readVint(at, true)
      const len = readVint(at + id.length, false)
      const body = at + id.length + len.length
      const unknownSize = len.value === 2 ** (7 * len.length) - 1
      const bodyEnd = unknownSize ? end : Math.min(body + len.value, end)
      if (containers.has(id.value)) walk(body, bodyEnd)
      else if (id.value === 0xb0) size.width = data.readUIntBE(body, len.value)
      else if (id.value === 0xba) size.height = data.readUIntBE(body, len.value)
      at = bodyEnd
    }
  }

  walk(0, data.length)
  if (!size.width || !size.height) throw new Error(`Couldn't read the size of ${path}`)
  return size
}

async function video(slug: string, file: string): Promise<string> {
  const load = videos[assetPath(slug, file)]
  if (!load) throw new Error(`Video not found: src/assets/img/${slug}/${file}`)
  return load()
}

export type GalleryItem =
  | { kind: 'image'; thumb: string; full: string; alt: string; width: number; height: number }
  | { kind: 'video'; src: string; alt: string; width: number; height: number }

/**
 * Build a gallery-sized version and a large lightbox version of each image.
 * Videos (.webm) are passed through as-is, with their size.
 */
export function galleryItems(slug: string, items: { src: string; alt: string }[]): Promise<GalleryItem[]> {
  return Promise.all(
    items.map(async ({ src, alt }): Promise<GalleryItem> => {
      if (isVideo(src)) {
        return { kind: 'video', src: await video(slug, src), alt, ...videoSize(`src/assets/img/${slug}/${src}`) }
      }
      const meta = await image(slug, src)
      const [thumb, full] = await Promise.all([
        getImage({ src: meta, width: 960, format: 'webp' }),
        getImage({ src: meta, width: 2000, format: 'webp' }),
      ])
      return {
        kind: 'image',
        thumb: thumb.src,
        full: full.src,
        alt,
        width: Number(thumb.attributes.width),
        height: Number(thumb.attributes.height),
      }
    }),
  )
}
