import navModel from '../data/nav-model.json'

const SITE = 'https://canshift.app'
const SUMMARY =
  'Documentation for CANShift — an open-source CAN bus dashboard for ESP32, with C++/LVGL firmware, a browser tuner over Web Serial, and a mobile companion over BLE.'

interface NavItem {
  slug: string
  label?: string
  exists?: boolean
  children?: NavItem[]
}

interface NavGroup {
  label: string
  items: NavItem[]
}

const abs = (slug: string): string => `${SITE}/${slug.replace(/\/+$/, '')}/`

const pagesOf = (group: NavGroup): NavItem[] => {
  const out: NavItem[] = []
  for (const item of group.items) {
    if (item.exists && item.label) out.push(item)
    for (const child of item.children ?? []) {
      if (child.exists && child.label) out.push(child)
    }
  }
  return out
}

const render = (line: (page: NavItem) => string): string => {
  const out = ['# CANShift', '', `> ${SUMMARY}`, '']
  for (const group of navModel.groups as NavGroup[]) {
    out.push(`## ${group.label}`, '')
    for (const page of pagesOf(group)) out.push(line(page))
    out.push('')
  }
  return `${out.join('\n').trimEnd()}\n`
}

export const llmsIndex = (): string => render((page) => `- [${page.label}](${abs(page.slug)})`)

export const llmsFull = (describe: (slug: string) => string | undefined): string =>
  render((page) => {
    const description = describe(page.slug)
    return `- [${page.label}](${abs(page.slug)})${description ? `: ${description}` : ''}`
  })
