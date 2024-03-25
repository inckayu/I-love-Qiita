export const titleHighlighter = (title: string, words: string[]) => {
  words.forEach((word) => {
    if (word.length) {
      const reg = new RegExp(word, 'gi')
      title = title.replace(
        reg,
        (match) => `<span style="background-color: #DDC2FF; border-radius: 12px;">${match}</span>`
      )
    }
  })
  return title
}
