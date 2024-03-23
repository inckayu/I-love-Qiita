import axios from 'axios'

const remotePatternsWhitelist = [
  {
    protocol: 'https',
    hostname: 'qiita-image-store.s3.ap-northeast-1.amazonaws.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'avatars.githubusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'avatars0.githubusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'avatars1.githubusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'avatars2.githubusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh3.googleusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 's3-ap-northeast-1.amazonaws.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'qiita-image-store.s3.amazonaws.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'abs.twimg.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'pbs.twimg.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'secure.gravatar.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh1.googleusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh2.googleusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh3.googleusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh4.googleusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh5.googleusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'lh6.googleusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'avatars3.githubusercontent.com',
    port: '',
    pathname: '/**',
  },
  {
    protocol: 'https',
    hostname: 'gravatar.com',
    port: '',
    pathname: '/**',
  },
]

const unknowns = []

export const fetchArticles = async (query, page) => {
  // TODO: 詳細検索機能の実装後、検索条件はオブジェクトとかにまとめて引数として渡すようにする
  const TOKEN = 'xxx'
  const whitelist = remotePatternsWhitelist.map((pattern) => pattern.hostname)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  }
  const res = await axios.get(
    `https://qiita.com/api/v2/items?page=${page}&per_page=100${query.length ? `&query=${query}` : ''}`,
    config
  )
  res.data.forEach((article) => {
    const profile_image_url = article.user.profile_image_url
    let flag = false
    whitelist.map((hostname) => {
      const domain = profile_image_url.match(/\/\/(.*?)\//)
      if (domain && domain[1].includes(hostname)) {
        flag = true
      }
    })
    if (!flag) {
      // console.log(profile_image_url)
      const domain = profile_image_url.match(/\/\/(.*?)\//)
      if (!unknowns.includes(domain[1])) {
        unknowns.push(domain[1])
      }
    }
  })
}

for (let i = 101; i <= 110; i++) {
  await fetchArticles('', i)
}

// console.log('export const remotePatternsWhitelist = [')
unknowns.forEach((unknown) => {
  const pattern = {
    protocol: 'https',
    hostname: unknown,
    port: '',
    pathname: '/**',
  }
  console.log(pattern, ',')
})
// console.log(']')
