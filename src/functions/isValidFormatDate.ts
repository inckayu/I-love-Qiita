export const isValidFormatDate = (date: string) => {
  if (date === '') return true // 空文字列の場合はtrueを返す
  if (date.length > 10) return false // 10文字より多い場合はfalseを返す
  if ((date.match(/[\uFF0F/]/g) || []).length > 2) return false // スラッシュの数が2つより多い場合はfalseを返す
  if ((date.match(/[0-9\uFF10-\uFF19]/g) || []).length > 8) return false // 全角数字または半角数字の数が8つより多い場合はfalseを返す
  if (/^[\d/]+$/.test(date)) return true // 半角数字または半角スラッシュのみで構成される場合はtrueを返す
  if (/[^\uFF10-\uFF19\uFF0F]/.test(date) || /[A-Za-z]+/.test(date)) return false // 半角英大小文字を含む、あるいは全角数字または全角スラッシュ以外の文字が含まれている場合はfalseを返す
  // 全角数字または全角スラッシュのみで構成されている場合はtrueを返す
  return true
}
