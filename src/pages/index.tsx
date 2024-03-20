import ForumIcon from '@mui/icons-material/Forum'
import KeyIcon from '@mui/icons-material/Key'
import TuneIcon from '@mui/icons-material/Tune'
import { IconButton } from '@mui/material'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'

import useSearchForm from '@/hooks/useSearchForm'

import ApiKeyForm from '@/stories/ApiKeyForm'
import ArticleCard from '@/stories/ArticleCard'
import { Button } from '@/stories/Button'

import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import MainTextBox from '@/stories/MainTextBox'

import { Article } from '@/types/Article'


import styles from '@/styles/modules/home.module.scss'

import Paging from '@/stories/Paging'
import CommonModal from '@/stories/CommonModal'
import { articleTitleState } from '@/state/articleTitleState'



import { articlesState } from '@/state/articlesState'
import { isSearchingState } from '@/state/isSearchingState'
import { generatedSummariesState } from '@/state/generatedSummaries'
import { isOpenApiKeyModalState } from '@/state/isOpenModalState'


import { isValidApiKeyTokenState } from '@/state/isValidApiTokenState'

export default function Home() {
  const articles = useRecoilValue<Article[]>(articlesState)
  const isSearching = useRecoilValue<boolean>(isSearchingState)
  const isValidApiKeyToken = useRecoilValue<boolean>(isValidApiKeyTokenState)
  const generatedSummaries = useRecoilValue<string[]>(generatedSummariesState)
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const isOpenApiKeyModal = useRecoilValue<boolean>(isOpenApiKeyModalState)
  const { handleApiKeyModalClose, handleApiKeyButton, handleTitleClick } = useSearchForm()

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
                disabled={!articleTitle.length || !qiitaApiToken.length || !isValidApiKeyToken}
              />
            </div>
          </form>
        </div>
        <div className={styles.home__articles}>
          {isSearching ? (
            <div>Searching ...</div>
          ) : (
            <>
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  summary={generatedSummaries[index]}
                />
              ))}
              {articles.length ? <Paging /> : null}
            </>
          )}
        </div>
        <CommonModal isOpenModal={isOpenApiKeyModal} onClose={handleApiKeyModalClose}>
          <ApiKeyForm />
        </CommonModal>
      </main>
    </>
  )
}
