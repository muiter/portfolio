const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const homeUrl = `${base}/`
export const projectUrl = (slug: string) => `${base}/projects/${slug}/`
