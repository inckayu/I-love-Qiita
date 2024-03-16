import { useEffect, useState } from 'react'
import Head from 'next/head'
import { articles } from '../constants/articles'
import Link from 'next/link'
import axios from 'axios'
import { Article } from '@/types/Article'

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
  },
}

const fetchArticles = async (): Promise<Article[]> => {
  // TODO: configの型定義を追加する
  const res = await axios.get<Article[]>(
    'https://qiita.com/api/v2/items?per_page=5',
    config
  )
  return res.data
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  useEffect(() => {
    fetchArticles().then((articles) => {
      console.log(articles)
      setArticles(articles)
    })
  }, [])
  return (
    <>
      <Head>
        <title>I love Qiita</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>I love Qiita</h1>
        <div>
          <form action="">
            <input type="text" placeholder="記事タイトル" />
            <button>検索</button>
            <button>APIキーを入力</button>
          </form>
        </div>
        <div>
          {articles.map((article) => (
            <div key={article.id}>
              <Link href={article.id}>{article.title}</Link>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
