const strip = (value) => value.replace(/\/+$/, '')

export const isPlaceholder = (pathname, model) => {
  const path = strip(pathname)
  const match = (slug) => `/${slug}` === path
  for (const group of model.groups) {
    for (const item of group.items) {
      if (match(item.slug)) return Boolean(item.placeholder)
      for (const child of item.children ?? []) {
        if (match(child.slug)) return Boolean(child.placeholder)
      }
    }
  }
  return false
}
