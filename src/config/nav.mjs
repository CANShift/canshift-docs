const link = (item) => ({ slug: item.slug, label: item.label })

const buildItems = (items) =>
  items.flatMap((item) => {
    const self = item.exists ? [link(item)] : []
    const children = (item.children ?? []).filter((child) => child.exists).map(link)
    return [...self, ...children]
  })

const externalGroup = {
  label: 'External',
  collapsed: true,
  items: [
    {
      label: 'Tuner (web — includes flasher)',
      link: 'https://canshift.tmbk.ch',
      attrs: { target: '_blank', rel: 'noopener' },
      badge: { text: '↗', variant: 'note' },
    },
    {
      label: 'GitHub org',
      link: 'https://github.com/CANShift',
      attrs: { target: '_blank', rel: 'noopener' },
      badge: { text: '↗', variant: 'note' },
    },
  ],
}

export const buildSidebar = (model) => {
  const groups = model.groups
    .map((group) => ({
      label: group.label,
      collapsed: false,
      items: buildItems(group.items),
    }))
    .filter((group) => group.items.length > 0)
  return [...groups, externalGroup]
}
