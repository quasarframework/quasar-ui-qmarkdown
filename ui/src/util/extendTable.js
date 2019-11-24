// 'use strict'

export default function extendTable (md) {
  md.renderer.rules.table_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--table')

    return self.renderToken(tokens, idx, options)
  }
}

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = extendTable
//   export default extendTable
// }

// // hack for components to work correctly in node.js
// if (typeof global !== 'undefined') {
//  global.extendTable = extendTable
// }
