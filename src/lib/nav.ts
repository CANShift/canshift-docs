import navModel from '../data/nav-model.json'

export interface ResultSection {
  label: string
  order: number
}

interface NavItem {
  slug: string
  children?: NavItem[]
}

interface NavGroup {
  label: string
  items: NavItem[]
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
