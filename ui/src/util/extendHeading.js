import slugify from './slugify'

// Helper function to transform emoji tokens
function unemoji(TokenConstructor, token) {
  if (token.type === 'emoji') {
    return Object.assign(new TokenConstructor(), token, { content: token.markup })
  }
  return token
}

export default function extendHeading(
  md,
  tocData = [],
  toc = false,
  tocStart = 1,
  tocEnd = 3,
  noHeadingAnchorLinks = false
) {
  let Token
  md.core.ruler.push('headingLinks', function (state) {
    // Save the Token constructor for later use when building new token instances.
    if (!Token) {
      Token = state.Token
    }
  })

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx]

    // Get the numeric heading level (e.g., 1 for h1, 2 for h2, etc.)
    const tokenNumber = parseInt(token.tag[1])

    // Get the children tokens (which represent the inline content)
    const children = tokens[idx + 1].children

    // Build a plain text label by concatenating all child token content.
    const label = children.reduce((acc, t) => acc + t.content, '')

    // Build the CSS classes for the heading
    const classes = []
    classes.push('q-markdown--heading')
    classes.push(`q-markdown--heading-${token.tag}`)

    if (token.markup === '=') {
      classes.push('q-markdown--title-heavy')
    } else if (token.markup === '-') {
      classes.push('q-markdown--title-light')
    }

    // If heading anchor links are enabled, add the specific class.
    if (
      noHeadingAnchorLinks !== true &&
      tocStart &&
      tocEnd &&
      tocStart <= tocEnd &&
      tokenNumber >= tocStart &&
      tokenNumber <= tocEnd
    ) {
      classes.push('q-markdown--heading--anchor-link')
    }

    // Transform emoji tokens and render the inline content.
    const unemojiWithToken = unemoji.bind(null, Token)
    const renderedLabel = md.renderer.renderInline(children.map(unemojiWithToken), options, env)

    // Create a slug from the rendered label for the heading id.
    const id = slugify(
      renderedLabel
        .replace(/[<>]/g, '') // Remove any '<' or '>' characters.
        .toLowerCase() // Convert to lowercase.
    )

    // Set attributes for the heading token.
    token.attrSet('id', id)
    token.attrSet('name', id)
    token.attrSet('class', classes.join(' '))

    // If a table of contents is enabled, add this heading to the TOC data.
    if (toc) {
      if (
        tocStart &&
        tocEnd &&
        tocStart <= tocEnd &&
        tokenNumber >= tocStart &&
        tokenNumber <= tocEnd
      ) {
        tocData.push({ id: id, label: label, level: tokenNumber, children: [] })
      }
    }

    // If anchor links are enabled and the heading level is within the TOC range,
    // wrap the inline children with anchor link tokens to preserve formatting.
    if (noHeadingAnchorLinks !== true && tokenNumber <= tocEnd) {
      // Create the opening link token with the necessary attributes.
      const linkOpen = new Token('link_open', 'a', 1)
      linkOpen.attrSet('href', '#' + id)
      linkOpen.attrSet('aria-hidden', 'true')

      // Create the closing link token.
      const linkClose = new Token('link_close', 'a', -1)

      // Preserve the original inline tokens (to keep formatting like **bold**).
      const originalChildren = children.slice()

      // Replace children with the new tokens wrapping the original content.
      tokens[idx + 1].children = [linkOpen, ...originalChildren, linkClose]

      // Render the modified token.
      return md.renderer.renderToken(tokens, idx, options, env, self)
    }

    // Render the token as usual if no modifications were made.
    return self.renderToken(tokens, idx, options)
  }
}
