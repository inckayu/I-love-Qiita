import { useEffect, useState } from 'react'
import Head from 'next/head'
import { articles } from '../constants/articles'
import Link from 'next/link'
import axios from 'axios'
import { Article } from '@/types/Article'
import { useRecoilState } from 'recoil'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [title, setTitle] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [qiitaApiToken, setQiitaApiToken] =
    useRecoilState<string>(qiitaApiTokenState)

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleInputApi = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQiitaApiToken(e.target.value)
  }

  const handleTitleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault() // フォームが送信されてリロードされないよう
    setIsSearching(true)
    console.log(title)
    fetchArticles(title).then((articles) => {
      setArticles(articles)
      setIsSearching(false)
    })
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${qiitaApiToken}`,
    },
  }

  const fetchArticles = async (title: string): Promise<Article[]> => {
    // TODO: configの型定義を追加する
    // TODO: 検索条件は最終的にはオブジェクトとかにまとめて引数として渡すようにする
    // TODO: エラーハンドリングを追加する(APIキーがない場合など)
    const query = `title:${title}`
    const res = await axios.get<Article[]>(
      `https://qiita.com/api/v2/items?per_page=5&query=${query}`,
      config
    )
    return res.data
  }

  useEffect(() => {
    // NOTE: 初期表示時に記事を取得する必要はないかもしれない
    // fetchArticles(title).then((articles) => {
    //   setArticles(articles)
    // })
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
            <button onClick={handleTitleClick}>検索</button>
          </form>
        </div>
        <div>
          <form action="">
            {/*
            TODO: APIキーの入力部分は最終的にはモーダルで実装したい
            TODO:　正規表現を用いてAPIキーの形式をチェックする
            */}
            <input
              onChange={handleInputApi}
              type="text"
              placeholder="APIキー"
            />
            <div>{qiitaApiToken}</div>
          </form>
        </div>
        <div>
          {isSearching ? (
            <div>Searching ...</div>
          ) : (
            articles.map((article) => (
              <div key={article.id}>
                <Link href={article.id}>{article.title}</Link>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  )
}
