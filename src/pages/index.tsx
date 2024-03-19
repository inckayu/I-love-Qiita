import { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { articleTitleState } from '@/state/articleTitleState'
import { Button } from '@/stories/Button'
import MainTextBox from '@/stories/MainTextBox'
import { IconButton } from '@mui/material'
import ForumIcon from '@mui/icons-material/Forum'
import TuneIcon from '@mui/icons-material/Tune'
import KeyIcon from '@mui/icons-material/Key'
import { Article } from '@/types/Article'
import ArticleCard from '@/stories/ArticleCard'
import styles from '@/styles/modules/home.module.scss'
import Paging from '@/stories/Paging'
import CommonModal from '@/stories/CommonModal'
import { isOpenApiKeyModalState } from '@/state/isOpenModalState'
import ApiKeyForm from '@/stories/ApiKeyForm'
import { generateAbstract } from '@/functions/generateAbstract'

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isValidApiToken, setIsValidApiToken] = useState<boolean>(false)
  const [generatedAbstracts, setGeneratedAbstracts] = useState<string[]>([])
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const [isOpenApiKeyModal, setIsOpenApiKeyModal] = useRecoilState<boolean>(
    isOpenApiKeyModalState
  )

  const handleApiKeyModalClose = () => {
    setIsOpenApiKeyModal(false)
  }

  const handleApiKeyButton = () => {
    setIsOpenApiKeyModal(true)
  }

  const handleTitleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault() // フォームが送信されてリロードされないよう
    setIsSearching(true)
    fetchArticles(articleTitle).then(async (articles) => {
      setArticles(articles)

      const summaries = await Promise.all(
        articles.map((article) => generateAbstract(article.body))
      )
      console.log(summaries)
      setGeneratedAbstracts(summaries) // 要約の配列を状態に保存
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
    setIsValidApiToken(true)
    // if (!isSearching) return
    // NOTE: 初期表示時に記事を取得する必要はないかもしれない
    console.log(articleTitle)
    console.log(qiitaApiToken)
    console.log(isValidApiToken)
    if (articleTitle.length && qiitaApiToken.length) {
      //NOTE: 記事詳細画面から戻ってきた場合のみ実行されることを想定しているのでisValidApiTokenはチェックしないが、要検証
      // 依存配列が空だからarticleTitleまたはqiitaApiTokenが変更された場合には実行されないはず
      fetchArticles(articleTitle).then(async (articles) => {
        setArticles(articles)

        const summaries = await Promise.all(
          articles.map((article) => generateAbstract(article.body))
        )
        console.log(summaries)
        setGeneratedAbstracts(summaries) // 要約の配列を状態に保存
        setIsSearching(false)
      })
    }
  }, [])

  return (
    <>
      <Head>
        <title>I love Qiita</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.home}>
        <h1 className={styles.home__title}>I love Qiita</h1>
        <div className={styles.home__form}>
          <form>
            <div className={styles.home__textbox}>
              <MainTextBox />
            </div>
            <div className={styles.home__options}>
              <IconButton>
                <ForumIcon />
              </IconButton>
              <IconButton>
                <TuneIcon />
              </IconButton>
              <IconButton onClick={handleApiKeyButton}>
                <KeyIcon />
              </IconButton>
            </div>
            <div className={styles.home__search}>
              <Button
                variant="primary"
                onClick={handleTitleClick}
                size="large"
                label={'Search'}
                disabled={
                  !articleTitle.length ||
                  !qiitaApiToken.length ||
                  !isValidApiToken
                }
              />
            </div>
          </form>
        </div>
        <div style={{ width: '100%' }}>
          {isSearching ? (
            <div>Searching ...</div>
          ) : (
            <>
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  abstract={generatedAbstracts[index]}
                />
              ))}
              {articles.length ? <Paging /> : null}
            </>
          )}
        </div>
        <CommonModal
          isOpenModal={isOpenApiKeyModal}
          onClose={handleApiKeyModalClose}
        >
          <ApiKeyForm />
        </CommonModal>
      </main>
    </>
  )
}
