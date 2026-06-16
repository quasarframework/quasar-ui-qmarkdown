export interface TocNode {
  children: TocNode[]
  id: string
  label: string
  level: number
}

export default function makeTree(list: TocNode[], tocStart = 1): TocNode[] {
  const tree: TocNode[] = []
  const parents: TocNode[] = []

  list.forEach((item) => {
    const node = {
      ...item,
      children: Array.isArray(item.children) ? [...item.children] : [],
    }

    while (parents.length > 0) {
      const lastParent = parents[parents.length - 1]
      if (lastParent === undefined || lastParent.level < node.level) {
        break
      }

      parents.pop()
    }

    const parent = parents[parents.length - 1]

    if (node.level <= tocStart || parent === undefined) {
      tree.push(node)
    } else {
      parent.children.push(node)
    }

    parents.push(node)
  })

  return tree
}
