import { useRouter } from 'next/router'

const Article = () => {
  const router = useRouter()
  const articleId = String(router.query.articleId)
  return (
    <div>
      <div>{articleId}</div>
    </div>
  )
}

export default Article
