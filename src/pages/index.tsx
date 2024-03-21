import ForumIcon from '@mui/icons-material/Forum'
import KeyIcon from '@mui/icons-material/Key'
import TuneIcon from '@mui/icons-material/Tune'
import { IconButton } from '@mui/material'
import Head from 'next/head'
import { useRecoilValue } from 'recoil'

import useDetailedSearchForm from '@/hooks/useDetailedSearchForm'
import useSearchForm from '@/hooks/useSearchForm'

import ApiKeyForm from '@/stories/ApiKeyForm'
import ArticleCard from '@/stories/ArticleCard'
import { Button } from '@/stories/Button'
import CommonModal from '@/stories/CommonModal'
import DetailedSearchForm from '@/stories/DetailedSearchForm'
import MainTextBox from '@/stories/MainTextBox'
import Paging from '@/stories/Paging'

import { Article } from '@/types/Article'

import { articleTitleState } from '@/state/articleTitleState'
import { articlesState } from '@/state/articlesState'
import { generatedSummariesState } from '@/state/generatedSummaries'
import { isOpenApiKeyModalState } from '@/state/isOpenApiKeyModalState'
import { isOpenDetailedSearchModalState } from '@/state/isOpenDetailedSearchModalState'
import { isSearchingState } from '@/state/isSearchingState'
import { isSkeletonState } from '@/state/isSkeletonState'
import { isValidApiKeyTokenState } from '@/state/isValidApiTokenState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import styles from '@/styles/modules/home.module.scss'

export default function Home() {
  const articles = useRecoilValue<Article[]>(articlesState)
  const isSearching = useRecoilValue<boolean>(isSearchingState)
  const isValidApiKeyToken = useRecoilValue<boolean>(isValidApiKeyTokenState)
  const generatedSummaries = useRecoilValue<string[]>(generatedSummariesState)
  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const isOpenApiKeyModal = useRecoilValue<boolean>(isOpenApiKeyModalState)
  const isSkeleton = useRecoilValue<boolean>(isSkeletonState)
  const isOpenDetailedSearchModal = useRecoilValue<boolean>(isOpenDetailedSearchModalState)
  const { handleApiKeyModalClose, handleApiKeyButton, handleTitleClick, handleSearchFormSubmit } =
    useSearchForm()
  const { handleDetailedSearchModalClose, handleDetailedSearchButton } = useDetailedSearchForm()

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
          <form onSubmit={handleSearchFormSubmit}>
            <div className={styles.home__textbox}>
              <MainTextBox />
            </div>
            <div className={styles.home__options}>
              <IconButton>
                <ForumIcon />
              </IconButton>
              <IconButton>
                <TuneIcon onClick={handleDetailedSearchButton}/>
              </IconButton>
              <IconButton onClick={handleApiKeyButton}>
                <KeyIcon />
              </IconButton>
            </div>
            <div className={styles.home__search}>
              <Button
                variant="primary"
                onClick={(e) => handleTitleClick(e)}
                size="large"
                label={'Search'}
                disabled={!articleTitle.length || !qiitaApiToken.length || !isValidApiKeyToken}
                isLoading={isSearching}
              />
            </div>
          </form>
        </div>
        <div className={styles.home__articles}>
          {isSkeleton === isSearching ? (
            // 記事検索と要約に4秒以上かかることを前提条件にしている
            // ArticleCardはスケルトン状態と記事が表示された状態との2つを持つので
            // レンダリングされるのは記事検索と要約生成が終了(false === false)または4秒以上かかる(true === true)ときのみ
            <>
              {articles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  summary={generatedSummaries[index]}
                  isSkeleton={isSkeleton}
                />
              ))}
              {articles.length && !isSkeleton ? <Paging /> : null}
            </>
          ) : (
            null
          )}
        </div>
        <CommonModal isOpenModal={isOpenApiKeyModal} onClose={handleApiKeyModalClose}>
          <ApiKeyForm />
        </CommonModal>
        <CommonModal isOpenModal={isOpenDetailedSearchModal} onClose={handleDetailedSearchModalClose}>
          <DetailedSearchForm />
        </CommonModal>
      </main>
    </>
  )
}
