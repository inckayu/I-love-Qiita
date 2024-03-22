export const decorateLink = (html: string) => {
  return html.replace(
    /<a href=/g,
    '<a style="color: #6F23D0; text-decoration: underline;" rel="noopener noreferrer" href='
  )
}
