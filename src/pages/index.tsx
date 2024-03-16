import Head from 'next/head'
import { articles } from '../constants/articles'
import Link from 'next/link'

export default function Home() {
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
