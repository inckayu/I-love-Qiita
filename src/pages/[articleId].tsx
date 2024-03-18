import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Article } from '@/types/Article'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { useRecoilValue } from 'recoil'
import Tag from '@/stories/Tag'
import UserInfo from '@/stories/UserInfo'
import FavoriteIcon from '@mui/icons-material/Favorite'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import Divider from '@/stories/Divider'
import { Button } from '@/stories/Button'

const Article = () => {
  const [article, setArticle] = useState<Article | null>(null)
  const router = useRouter()
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${qiitaApiToken}`,
    },
  }

  const fetchArticleDetail = async (id: string): Promise<Article> => {
    const res = await axios.get(`https://qiita.com/api/v2/items/${id}`, config)
    return res.data
  }

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

  const tags = ['typescript', 'react', 'nextjs']
  return article === null ? (
    <div>loading...</div>
  ) : (
    <div>
      <div>back</div>
      <div>
        <div>
          <div>{article.title}</div>
          <Button variant="primary" size="large" label="Read in Qiita" />
        </div>

        <div>
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag} />
          ))}
        </div>
        <div>
          <div>
            <div>{article.created_at}</div>
            <div>{article.updated_at}</div>
          </div>
          <UserInfo
            user={{
              organization: article.user.organization,
              name: article.user.name,
              profile_image_url: article.user.profile_image_url,
            }}
          />
        </div>
        <div>
          <div>
            <FavoriteIcon />
            <div>{article.likes_count}</div>
          </div>
          <div>
            <BookmarkIcon />
            <div>{article.stocks_count}</div>
          </div>
        </div>
        <Divider />
        {/* TODO: dangerouslySetInnerHTMLにセットしたrendered_bodyのサニタイズ */}
        <div dangerouslySetInnerHTML={{ __html: article.rendered_body }} />
      </div>
    </div>
  )
}

export default Article
