export const downgradeHeadings = (body: string) => {
  console.log(body)
  body = body.replace(
    /<h([1-5])((?:\s+[^>]*?)?)>((?:.|[\r\n])*?)<\/h\1>/g,
    (_, p1, p2, p3) => `<h${Number(p1) + 1}${p2}>${p3}</h${Number(p1) + 1}>`
  )
  console.log(body)

  return body
}
