// 'use strict'

export default function extendLink (md) {
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    const hrefIndex = token.attrIndex('href')

    if (token.attrs[hrefIndex][1][0] === '/' ||
      token.attrs[hrefIndex][1][0] === '#' ||
      token.attrs[hrefIndex][1].startsWith('..')) {
      token.attrSet('class', 'q-markdown--link q-markdown--link-local')
    } else {
      token.attrSet('class', 'q-markdown--link q-markdown--link-external')
      token.attrSet('target', '_blank')
    }

    return self.renderToken(tokens, idx, options)
  }
}

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = extendLink
//   export default extendLink
// }

// // hack for components to work correctly in node.js
// if (typeof global !== 'undefined') {
//  global.extendLink = extendLink
// }
