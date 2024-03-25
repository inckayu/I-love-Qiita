import KeyIcon from '@mui/icons-material/Key'
import TuneIcon from '@mui/icons-material/Tune'
import { IconButton } from '@mui/material'
import { useRecoilValue } from 'recoil'

import useDetailedSearchForm from '@/hooks/useDetailedSearchForm'
import useSearchForm from '@/hooks/useSearchForm'

import { Button } from '@/stories/Button/Button'

import { Article } from '@/types/Article'
import { PublicationTimeline } from '@/types/PublicationTimeline'

import ApiKeyForm from '@/components/ApiKeyForm'
import ArticleCard from '@/components/ArticleCard'
import CommonHead from '@/components/CommonHead'
import CommonModal from '@/components/CommonModal'
import DetailedSearchForm from '@/components/DetailedSearchForm'
import MainTextBox from '@/components/MainTextBox'
import Paging from '@/components/Paging'
import { articleTitleState } from '@/state/articleQuery/articleTitleState'
import { articlesState } from '@/state/articlesState'
import { generatedSummariesState } from '@/state/generatedSummaries'
import { isOpenApiKeyModalState } from '@/state/isOpenApiKeyModalState'
import { isOpenDetailedSearchModalState } from '@/state/isOpenDetailedSearchModalState'
import { isSearchingState } from '@/state/isSearchingState'
import { isSkeletonState } from '@/state/isSkeletonState'
import { isValidApiKeyTokenState } from '@/state/isValidApiTokenState'
import { isValidDateFormatsState } from '@/state/isValidDateFormatsState'
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
  const isValidDateFormats = useRecoilValue<PublicationTimeline>(isValidDateFormatsState)

  const isCorrectDateFormat =
    isValidDateFormats.lastUpdate.start &&
    isValidDateFormats.lastUpdate.end &&
    isValidDateFormats.publication.start &&
    isValidDateFormats.publication.end

  return (
    <>
      <CommonHead />
      <main className={styles.home}>
        <h1 className={styles.home__title}>I love Qiita</h1>
        <div className={styles.home__subtext}>
          I love Qiita, where many seekers of knowledge meet up.
        </div>
        <div className={styles.home__form}>
          <form onSubmit={handleSearchFormSubmit}>
            <div className={styles.home__textbox}>
              <MainTextBox
                placeholder={
                  !isValidApiKeyToken || !qiitaApiToken.length
                    ? 'Input your Qiita API token first from the blinking key icon below.'
                    : 'Type some words related to titles of articles you are interested in'
                }
                disabled={!isValidApiKeyToken || !qiitaApiToken.length}
              />
            </div>
            <div className={styles.home__options}>
              <IconButton onClick={handleDetailedSearchButton} className={styles.home__iconbutton}>
                <TuneIcon />
              </IconButton>
              <IconButton
                onClick={handleApiKeyButton}
                className={`${styles.home__iconbutton} ${isValidApiKeyToken && qiitaApiToken.length ? null : `${styles.home__blink}`}`}
              >
                <KeyIcon />
              </IconButton>
            </div>
            <div className={styles.home__search}>
              <Button
                variant="primary"
                onClick={(e) => handleTitleClick(e)}
                size="large"
                label={'Search'}
                disabled={
                  !articleTitle.length ||
                  !qiitaApiToken.length ||
                  !isValidApiKeyToken ||
                  !isCorrectDateFormat
                }
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
          ) : null}
        </div>
        <CommonModal isOpenModal={isOpenApiKeyModal} onClose={handleApiKeyModalClose}>
          <ApiKeyForm />
        </CommonModal>
        <CommonModal
          isOpenModal={isOpenDetailedSearchModal}
          onClose={handleDetailedSearchModalClose}
        >
          <DetailedSearchForm />
        </CommonModal>
      </main>
    </>
  )
}
