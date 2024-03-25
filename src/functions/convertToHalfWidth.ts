export const convertToHalfWidth = (str: string) => {
  // if (/[^\uFF10-\uFF19\uFF0F]/.test(str)) {
  //   throw new Error('全角数字とスラッシュ以外の文字が含まれています');
  // }

  console.log(
    str.replace(/[\uFF10-\uFF19\uFF0F]/g, (match) =>
      match === '\uFF0F' ? '/' : String.fromCharCode(match.charCodeAt(0) - 0xfee0)
    )
  )
  return str.replace(/[\uFF10-\uFF19\uFF0F]/g, (match) =>
    match === '\uFF0F' ? '/' : String.fromCharCode(match.charCodeAt(0) - 0xfee0)
  )
}
