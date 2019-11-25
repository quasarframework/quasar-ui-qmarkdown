// 'use strict'

export default function slugify (str) {
  return encodeURIComponent(String(str).trim().replace(/\s+/g, '-'))
}

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = slugify
//   export default slugify
// }

// // hack for components to work correctly in node.js
// if (typeof global !== 'undefined') {
//  global.slugify = slugify
// }
