import axios from 'axios'

export const fetchTags = async (token, page) => {
  // TODO: 詳細検索機能の実装後、検索条件はオブジェクトとかにまとめて引数として渡すようにする

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(`https://qiita.com/api/v2/tags?sort=count&page=${page}&per_page=100`, config)
  res.data.forEach((tag) => {
    console.log(tag)
    console.log(",")
  })
  // return res.data
}
console.log("export const tags = [")
for (let i = 1; i <= 10; i++) {
  await fetchTags('356c60512993416df8909e7fea6afe5e73f803fc', i)
}
console.log("]")