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

const fetchArticles = async (title: string): Promise<Article[]> => {
  // TODO: configの型定義を追加する
  // TODO: 検索条件は最終的にはオブジェクトとかにまとめて引数として渡すようにする
  const query = `title:${title}`
  const res = await axios.get<Article[]>(
    `https://qiita.com/api/v2/items?per_page=5&query=${query}`,
    config
  )
  return res.data
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [title, setTitle] = useState<string>('')

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(title)
    fetchArticles(title).then((articles) => {
      setArticles(articles)
    })
  }

  useEffect(() => {
    // NOTE: 初期表示時に記事を取得する必要はないかもしれない
    fetchArticles(title).then((articles) => {
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
          <form>
            <input
              onChange={handleInputTitle}
              type="text"
              placeholder="記事タイトル"
            />
            <button onClick={handleClick}>検索</button>
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
