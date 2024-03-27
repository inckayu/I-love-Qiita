export const convertToHalfWidth = (str: string) => {
  return str.replace(/[\uFF10-\uFF19\uFF0F]/g, (match) =>
    match === '\uFF0F' ? '/' : String.fromCharCode(match.charCodeAt(0) - 0xfee0)
  )
}
