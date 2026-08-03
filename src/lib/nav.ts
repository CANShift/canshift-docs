import navModel from '../data/nav-model.json'

export interface ResultSection {
  label: string
  order: number
}

interface NavItem {
  slug: string
  label?: string
  exists?: boolean
  placeholder?: boolean
  children?: NavItem[]
}

interface NavGroup {
  label: string
  navLabel: string
  items: NavItem[]
}

export interface Suggestion {
  group: string
  title: string
  slug: string
}

const isAuthored = (item: NavItem): boolean =>
  Boolean(item.exists && !item.placeholder && item.label)

const firstAuthored = (group: NavGroup): NavItem | null => {
  for (const item of group.items) {
    if (isAuthored(item)) return item
    for (const child of item.children ?? []) {
      if (isAuthored(child)) return child
    }
  }
  return null
}

export const suggestions = (limit = 3): Suggestion[] => {
  const picks: Suggestion[] = []
  for (const group of navModel.groups as NavGroup[]) {
    const page = firstAuthored(group)
    if (page) picks.push({ group: group.navLabel, title: page.label!, slug: page.slug })
    if (picks.length >= limit) break
  }
  return picks
}

const ELSEWHERE: ResultSection = { label: 'ELSEWHERE', order: Number.MAX_SAFE_INTEGER }

const strip = (value: string): string => value.replace(/\/+$/, '')

export const sectionForPath = (pathname: string): ResultSection => {
  const path = strip(pathname)
  const groups = navModel.groups as NavGroup[]
  for (let order = 0; order < groups.length; order++) {
    const group = groups[order]
    for (const item of group.items) {
      if (strip(`/${item.slug}`) === path) return { label: group.label, order }
      for (const child of item.children ?? []) {
        if (strip(`/${child.slug}`) === path) return { label: group.label, order }
      }
    }
  }
  return ELSEWHERE
}
