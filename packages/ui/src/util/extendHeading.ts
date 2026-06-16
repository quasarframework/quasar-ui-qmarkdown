import slugify from './slugify'

const headingIdsKey = '__qMarkdownHeadingIds'

interface TocEntry {
  children: TocEntry[]
  id: string
  label: string
  level: number
}

function unemoji(TokenConstructor: any, token: any): any {
  if (token.type === 'emoji') {
    return Object.assign(new TokenConstructor(), token, { content: token.markup })
  }
  return token
}

export default function extendHeading(
  md: any,
  tocData: TocEntry[] = [],
  toc = false,
  tocStart = 1,
  tocEnd = 3,
  noHeadingAnchorLinks = false,
): void {
  let Token: any
  md.core.ruler.push('headingLinks', function (state: any) {
    // save the Token constructor because we'll be building a few instances at render
    // time; that's sort of outside the intended markdown-it parsing sequence, but
    // since we have tight control over what we're creating (a link), we're safe
    if (!Token) {
      Token = state.Token
    }
    state.env[headingIdsKey] = Object.create(null)
  })

  md.renderer.rules.heading_open = (
    tokens: any[],
    idx: number,
    options: any,
    env: Record<string, any>,
    self: any,
  ) => {
    const token = tokens[idx]

    // get the token number
    const tokenNumber = parseInt(token.tag[1])

    const children = tokens[idx + 1].children

    const label = children.reduce((acc: string, t: any) => acc + t.content, '')

    const classes = []
    classes.push('q-markdown--heading')
    classes.push(`q-markdown--heading-${token.tag}`)

    if (token.markup === '=') {
      classes.push('q-markdown--title-heavy')
    } else if (token.markup === '-') {
      classes.push('q-markdown--title-light')
    }

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

    const unemojiWithToken = unemoji.bind(null, Token)
    const renderedLabel = md.renderer.renderInline(children.map(unemojiWithToken), options, env)

    let id = slugify(
      renderedLabel
        .replace(/[<>]/g, '') // In case the heading contains `<stuff>`
        .toLowerCase(), // should be lowercase
    )

    const seenIds = env[headingIdsKey] || (env[headingIdsKey] = Object.create(null))
    if (seenIds[id] === undefined) {
      seenIds[id] = 0
    } else {
      seenIds[id]++
      id = `${id}-${seenIds[id]}`
    }

    token.attrSet('id', id)
    token.attrSet('name', id)
    token.attrSet('class', classes.join(' '))

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

    if (noHeadingAnchorLinks !== true && tokenNumber <= tocEnd) {
      // add 3 new token objects link_open, text, link_close
      const linkOpen = new Token('link_open', 'a', 1)
      const text = new Token('text', '', 0)
      if (options.enableHeadingLinkIcons) {
        text.content = options.linkIcon
      }
      text.content = label

      const linkClose = new Token('link_close', 'a', -1)

      // add some link attributes
      // linkOpen.attrSet('id', id)
      // linkOpen.attrSet('class', '')
      linkOpen.attrSet('href', '#' + id)
      linkOpen.attrSet('aria-hidden', 'true')

      // remove previous children
      while (children.length > 0) children.pop()

      // add new token objects as children of heading
      children.unshift(linkClose)
      children.unshift(text)
      children.unshift(linkOpen)

      return md.renderer.renderToken(tokens, idx, options, env, self)
    }

    return self.renderToken(tokens, idx, options)
  }
}
