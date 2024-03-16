import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Article } from '@/types/Article'

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_QIITA_TOKEN}`,
  },
}

const fetchArticleDetail = async (id: string): Promise<Article> => {
  const res = await axios.get(`https://qiita.com/api/v2/items/${id}`, config)
  return res.data
}

const Article = () => {
  const [article, setArticle] = useState<Article | null>(null)
  const router = useRouter()

  useEffect(() => {
    const articleId = router.query.articleId
    console.log(articleId)
    if (articleId && typeof articleId === 'string') {
      fetchArticleDetail(articleId).then((article) => {
        console.log(article)
        setArticle(article)
      })
    }
  }, [router.query.articleId])
  return article === null ? (
    <div>loading...</div>
  ) : (
    <div>
      <div>{article.title}</div>
      <div>{article.created_at}</div>
      <div>{article.updated_at}</div>
      <div>{article.url}</div>
      <div>{article.user.id}</div>
      <div>{article.body}</div>
    </div>
  )
}

export default Article
