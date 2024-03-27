export const pseudoCodingBlock = (code: string) => {
  code = code.replace(
    /<div class="highlight"/g,
    '<div class="highlight" style="background-color: #1a1a1a; border-radius: 24px; padding: 16px; overflow-x: scroll; overscroll-behavior-x: contain;"'
  )
  return code
}
