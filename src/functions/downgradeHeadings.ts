export const downgradeHeadings = (body: string) => {
  body = body.replace(
    /<h([1-5])((?:\s+[^>]*?)?)>((?:.|[\r\n])*?)<\/h\1>/g,
    (_, p1, p2, p3) => `<h${Number(p1) + 1}${p2}>${p3}</h${Number(p1) + 1}>`
  )
  return body
}
