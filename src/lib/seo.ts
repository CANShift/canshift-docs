import navModel from '../data/nav-model.json'

const SITE = 'https://canshift.app'
const SITE_NAME = 'CANShift docs'
const LOGO = `${SITE}/og-image-1200x630.png`

const ORG = {
  '@type': 'Organization',
  name: 'CANShift',
  url: SITE,
}

const strip = (value: string): string => value.replace(/\/+$/, '')

const abs = (path: string): string => {
  const clean = strip(path.startsWith('/') ? path : `/${path}`)
  return clean ? `${SITE}${clean}/` : SITE
}

interface NavItem {
  slug: string
  label?: string
  exists?: boolean
  children?: NavItem[]
}

interface NavGroup {
  navLabel: string
  items: NavItem[]
}

interface Crumb {
  groupLabel: string
  groupHref: string
  pageLabel: string
}

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE,
  inLanguage: 'en',
  publisher: ORG,
})

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  ...ORG,
  logo: LOGO,
  sameAs: ['https://github.com/CANShift'],
})

export const softwareApplicationLd = (description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CANShift',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'ESP32, Web, iOS',
  url: SITE,
  description,
  isAccessibleForFree: true,
  license: 'https://opensource.org/licenses/MIT',
  publisher: ORG,
})

export const articleLd = (path: string, title: string, description: string, modified?: string) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: title,
  description,
  url: abs(path),
  inLanguage: 'en',
  isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: SITE },
  publisher: ORG,
  ...(modified ? { dateModified: modified } : {}),
})

const findCrumb = (path: string): Crumb | null => {
  for (const group of navModel.groups as NavGroup[]) {
    const first = group.items.find((item) => item.exists) ?? group.items[0]
    for (const item of group.items) {
      if (strip(`/${item.slug}`) === path) {
        return { groupLabel: group.navLabel, groupHref: first.slug, pageLabel: item.label ?? '' }
      }
      for (const child of item.children ?? []) {
        if (strip(`/${child.slug}`) === path) {
          return { groupLabel: group.navLabel, groupHref: first.slug, pageLabel: child.label ?? '' }
        }
      }
    }
  }
  return null
}

export const breadcrumbLd = (path: string, title: string) => {
  const crumb = findCrumb(path)
  if (!crumb) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Docs', item: SITE },
      { '@type': 'ListItem', position: 2, name: crumb.groupLabel, item: abs(crumb.groupHref) },
      { '@type': 'ListItem', position: 3, name: crumb.pageLabel || title, item: abs(path) },
    ],
  }
}
