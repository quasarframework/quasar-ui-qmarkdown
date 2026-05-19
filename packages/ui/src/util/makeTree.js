export default function makeTree(list, tocStart = 1) {
  const tree = [];
  const parents = [];

  list.forEach((item) => {
    const node = {
      ...item,
      children: Array.isArray(item.children) ? [...item.children] : [],
    };

    while (parents.length > 0 && parents[parents.length - 1].level >= node.level) {
      parents.pop();
    }

    const parent = parents[parents.length - 1];

    if (node.level <= tocStart || parent === undefined) {
      tree.push(node);
    } else {
      parent.children.push(node);
    }

    parents.push(node);
  });

  return tree;
}
