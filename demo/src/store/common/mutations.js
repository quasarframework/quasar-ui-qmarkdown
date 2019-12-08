export const toc = (state, toc) => {
  state.toc.splice(0, state.toc.length, ...toc)
}
