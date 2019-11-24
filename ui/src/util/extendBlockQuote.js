// 'use strict'

export default function extendBlockQuote (md) {
  md.renderer.rules.blockquote_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--note')
    return self.renderToken(tokens, idx, options)
  }
}

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = extendBlockQuote
//   export default extendBlockQuote
// }

// // hack for components to work correctly in node.js
// if (typeof global !== 'undefined') {
//  global.extendBlockQuote = extendBlockQuote
// }
