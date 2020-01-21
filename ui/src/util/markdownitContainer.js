// Process block-level custom containers
//

export default function containerPlugin (md, name, options) {
  function validateDefault (params) {
    return params.trim().split(' ', 2)[0] === name
  }

  function renderDefault (tokens, idx, _options, env, self) {
    // add a class to the opening tag
    if (tokens[idx].nesting === 1) {
      tokens[idx].attrPush(['class', name])
    }

    return self.renderToken(tokens, idx, _options, env, self)
  }

  options = options || {}

  var minMarkers = 3,
    markerStr = options.marker || ':',
    markerChar = markerStr.charCodeAt(0),
    markerLen = markerStr.length,
    validate = options.validate || validateDefault,
    render = options.render || renderDefault

  function container (state, startLine, endLine, silent) {
    var pos, nextLine, markerCount, markup, params, token,
      oldParent, oldLineMax,
      autoClosed = false,
      start = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine]

    // Check out the first character quickly,
    // this should filter out most of non-containers
    //
    if (markerChar !== state.src.charCodeAt(start)) { return false }

    // Check out the rest of the marker string
    //
    for (pos = start + 1; pos <= max; pos++) {
      if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
        break
      }
    }

    markerCount = Math.floor((pos - start) / markerLen)
    if (markerCount < minMarkers) { return false }
    pos -= (pos - start) % markerLen

    markup = state.src.slice(start, pos)
    params = state.src.slice(pos, max)
    if (!validate(params)) { return false }

    // Since start is found, we can report success here in validation mode
    //
    if (silent) { return true }

    // Search for the end of the block
    //
    nextLine = startLine

    for (;;) {
      nextLine++
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break
      }

      start = state.bMarks[nextLine] + state.tShift[nextLine]
      max = state.eMarks[nextLine]

      if (start < max && state.sCount[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break
      }

      if (markerChar !== state.src.charCodeAt(start)) { continue }

      if (state.sCount[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue
      }

      for (pos = start + 1; pos <= max; pos++) {
        if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
          break
        }
      }

      // closing code fence must be at least as long as the opening one
      if (Math.floor((pos - start) / markerLen) < markerCount) { continue }

      // make sure tail has spaces only
      pos -= (pos - start) % markerLen
      pos = state.skipSpaces(pos)

      if (pos < max) { continue }

      // found!
      autoClosed = true
      break
    }

    oldParent = state.parentType
    oldLineMax = state.lineMax
    state.parentType = 'container'

    // this will prevent lazy continuations from ever going past our end marker
    state.lineMax = nextLine

    token = state.push('container_' + name + '_open', 'div', 1)
    token.markup = markup
    token.block = true
    token.info = params
    token.map = [startLine, nextLine]

    state.md.block.tokenize(state, startLine + 1, nextLine)

    token = state.push('container_' + name + '_close', 'div', -1)
    token.markup = state.src.slice(start, pos)
    token.block = true

    state.parentType = oldParent
    state.lineMax = oldLineMax
    state.line = nextLine + (autoClosed ? 1 : 0)

    return true
  }

  md.block.ruler.before('fence', 'container_' + name, container, {
    alt: ['paragraph', 'reference', 'blockquote', 'list']
  })
  md.renderer.rules['container_' + name + '_open'] = render
  md.renderer.rules['container_' + name + '_close'] = render
};
