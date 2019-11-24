// 'use strict'

export default function extendImage (md) {
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    token.attrSet('class', 'q-markdown--image')
    return self.renderToken(tokens, idx, options)
  }
}

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = extendImage
//   export default extendImage
// }

// // hack for components to work correctly in node.js
// if (typeof global !== 'undefined') {
//  global.extendImage = extendImage
// }
