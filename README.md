# Matthew Muiter's Portfolio

My portfolio site: [muiter.github.io/portfolio](https://muiter.github.io/portfolio/)

A static site built with Astro and hosted on GitHub Pages. Projects are shown as circles that expand into their own page. The design follows my CV: black and white, New York and SF Pro type, with the only color coming from project screenshots.

## Tech stack

- **[Astro](https://astro.build/)**: static site generator. Every page is plain HTML at build time.
- **React**: only for the project image gallery, which loads when it scrolls into view.
- **Tailwind CSS**: styling.
- **TypeScript**: types for the project and experience data.
- **[react-photo-view](https://github.com/MinJieLiu/react-photo-view)**: the lightbox for enlarging images and videos.
- **View Transitions**: the circle-to-page animation, using the browser's built-in API with Astro's client router.

## Getting started

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

The dev server runs at [localhost:3000/portfolio/](http://localhost:3000/portfolio/). Only one dev server can run at a time. Stop the current one with `npx astro dev stop`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with live reload |
| `npm run build` | Type-check, then build the site into `docs/` |
| `npm run preview` | Serve the built `docs/` folder locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build, then publish `docs/` to GitHub Pages |

## Project structure

```
src/
├── assets/
│   ├── fonts/            # Self-hosted fonts (.woff2), trimmed to Latin characters
│   │   └── original/     # Untrimmed originals, kept for re-trimming
│   └── img/
│       └── <slug>/       # One folder of images and .webm videos per project
├── components/
│   ├── Gallery.tsx       # Image/video gallery and lightbox (React)
│   ├── ProjectGrid.astro # The grid of project circles
│   └── SocialLinks.astro # LinkedIn and GitHub links next to my name
├── data/
│   ├── experience.ts     # Experience section (matches the CV)
│   ├── projects.ts       # Every project's text, links and media
│   └── site.ts           # Name and social links
├── layouts/Layout.astro  # Page shell: <head>, fonts, transitions
├── lib/
│   ├── images.ts         # Loads project media and resizes images
│   ├── projectColors.ts  # Background color of circles and project pages
│   └── urls.ts           # Links that include the /portfolio base path
├── pages/
│   ├── index.astro       # Home page: name, projects, experience
│   └── projects/[slug].astro # One page per project
├── scripts/
│   └── project-transition.ts # Circle expand/collapse animation
└── styles/global.css     # Fonts, colors and lightbox styles
```

## Editing content

### Projects

Projects live in `src/data/projects.ts`. They appear in the order listed, most recent first.

```ts
{
  slug: "mews-design-system",      // URL (/projects/<slug>/) and media folder name
  title: "Mews Design System",
  task: "...",                     // Also used as the page's search description
  problem: "",                     // "Issue(s)"; hidden when empty
  solution: "",                    // Hidden when empty
  context: "",                     // "More Context"; optional
  urls: ["https://www.mews.design"], // Live site links; [] for none
  cover: "docs.png",               // Optional; defaults to the first image
  images: [
    { src: "docs.png", alt: "Documentation site" },
    { src: "storybook.webm", alt: "Storybook demo" }, // .webm plays on a loop
  ],
}
```

To add media, put the files in `src/assets/img/<slug>/` and list them under `images`. Images are resized and converted to WebP at build time.

Every image in `src/assets/img/` is published with the site, even unlisted ones. Folders for projects that aren't on the site yet are excluded in `src/lib/images.ts`. Remove a folder from those lists once its project is added.

### Experience

The Experience section comes from `src/data/experience.ts`, which mirrors the CV.

### Circle size

Each circle is half the width of the grid. Change `max-w-[52rem]` in `src/components/ProjectGrid.astro` to make them bigger or smaller.

### Fonts

The fonts are in `src/assets/fonts/`, and `src/styles/global.css` loads them with `@font-face`:

- `serif.woff2`: New York (variable, all weights)
- `sans-serif.woff2`, `sans-serif-medium.woff2`, `sans-serif-semibold.woff2`: SF Pro Text Regular, Medium and Semibold

Each file is trimmed to the same 222 Latin characters (letters, accents, punctuation, € and ™), which keeps it to about 30–50 KB. Characters outside that set show in a fallback system font. To add characters, trim the originals in `original/` again with [fonttools](https://github.com/fonttools/fonttools), adding the new ones to the `--unicodes` list:

```bash
pyftsubset src/assets/fonts/original/sans-serif.woff2 \
  --unicodes="U+0020-007E,U+00A1-00AC,U+00AE-00FF,U+0131,U+0152-0153,U+02BC,U+02C6,U+02DA,U+02DC,U+2010-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026-2027,U+2030-2031,U+2038-203A,U+2043-2044,U+20AC,U+2122,U+2212" \
  --layout-features='*' --flavor=woff2 \
  --output-file=src/assets/fonts/sans-serif.woff2
```

Repeat for `sans-serif-medium` and `sans-serif-semibold`.

## Deployment

The site is hosted on GitHub Pages at `/portfolio/`. Astro builds it into `docs/` (see `astro.config.mjs`), and `npm run deploy` builds and publishes that folder with [gh-pages](https://github.com/tschaub/gh-pages).

## License

MIT. See [LICENSE](LICENSE).
