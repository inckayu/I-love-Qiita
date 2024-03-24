export const getDataframeInIframe = (body: string) => {
  const aTags: string[] = []
  const iframe = /<iframe[\s\S]*?\/iframe>/g
  const iframes = body.match(iframe)
  if (iframes) {
    iframes.forEach((iframe) => {
      const dataContent = /data-content="([^"]*)"/
      const dataContents = iframe.match(dataContent)
      if (dataContents) {
        let url: string = dataContents[1]
        url = url // なぜかdecodeURIがうまくいかないので手動でデコード
          .replace(/%3A/g, ':')
          .replace(/%2F/g, '/')
          .replace(/%3F/g, '?')
          .replace(/%26/g, '&')
          .replace(/%3D/g, '=')
        const aTag = `<a href="${url}" target="_blank" rel="nofollow noopener">${url}</a>`
        aTags.push(aTag)
      }
    })
  }
  let count: number = 0
  body = body.replace(/(<iframe[^>]*>[^<]*)(<\/iframe>)/g, () => `${aTags[count++]}`)
  // (_, p1, p2) => `${p1}${aTags[count++]}${p2}`
  // dangerouslySetInnerHTMLの渡すときにiframeの中身がうまく反映されないのでiframeごとaタグに置換
  // countを後置インクリメントしてインデックスを取得したいので第二引数は関数にする
  return body
}
