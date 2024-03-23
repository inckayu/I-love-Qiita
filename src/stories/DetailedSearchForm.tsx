import useDetailedSearchForm from '@/hooks/useDetailedSearchForm'
import {
  articleAuthorState,
  articleBodyState,
  articleExcludedTagsState,
  articleLastUpdateState,
  articlePublicationState,
  articleTagsState,
  articleTitleState,
} from '@/state/articleQuery'
import { isValidApiKeyTokenState } from '@/state/isValidApiTokenState'
import { isValidDateFormatsState } from '@/state/isValidDateFormatsState'
import { qiitaApiTokenState } from '@/state/qiitaApiTokenState'
import { ArticleRange } from '@/types/ArticleRange'
import { PublicationTimeline } from '@/types/PublicationTimeline'
import { Tag } from '@/types/Tag'
import { useRecoilValue } from 'recoil'

import styles from '../styles/modules/detailedsearchform.module.scss'
import { Button } from './Button'
import TagsAutoComplete from './TagsAutoComplete'
import TextBox from './TextBox'

export default function DetailedSearchForm() {
  const {
    handleTitleChange,
    handleBodyChange,
    handleAuthorChange,
    handlePublicationStartChange,
    handlePublicationEndChange,
    handleLastUpdateStartChange,
    handleLastUpdateEndChange,
    handleCancelButtonClick,
    handleOKButtonClick,
  } = useDetailedSearchForm()
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const articleBody = useRecoilValue<string>(articleBodyState)
  const articleAuthor = useRecoilValue<string>(articleAuthorState)
  const articlePublication = useRecoilValue<ArticleRange>(articlePublicationState)
  const articleLastUpdate = useRecoilValue<ArticleRange>(articleLastUpdateState)
  const articleTags = useRecoilValue<Tag[]>(articleTagsState)
  const articleExcludedTags = useRecoilValue<Tag[]>(articleExcludedTagsState)

  const isBlankQuery =
    !articleTitle.length &&
    !articleBody.length &&
    !articleAuthor.length &&
    !articlePublication.start.length &&
    !articlePublication.end.length &&
    !articleLastUpdate.start.length &&
    !articleLastUpdate.end.length &&
    !articleTags.length &&
    !articleExcludedTags.length

  const qiitaApiToken = useRecoilValue<string>(qiitaApiTokenState)
  const isValidApiKeyToken = useRecoilValue<boolean>(isValidApiKeyTokenState)
  const isValidDateFormats = useRecoilValue<PublicationTimeline>(isValidDateFormatsState)

  const isCorrectDateFormat =
    isValidDateFormats.lastUpdate.start &&
    isValidDateFormats.lastUpdate.end &&
    isValidDateFormats.publication.start &&
    isValidDateFormats.publication.end

  return (
    <div className={styles.detailedsearchform}>
      <h2 className={styles.detailedsearchform__title}>Detailed Search Options</h2>
      <div className={styles.detailedsearchform__textboxes}>
        <TextBox value={articleTitle} label="Title" placeholder="" onChange={handleTitleChange} />
        <TextBox
          value={articleBody}
          label="body"
          placeholder="Keywords in the article body"
          onChange={handleBodyChange}
        />
        <TextBox
          value={articleAuthor}
          label="Author"
          placeholder=""
          onChange={handleAuthorChange}
        />
      </div>
      <div className={styles.detailedsearchform__ranges}>
        <div>
          <div className={styles.detailedsearchform__rangename}>Publication Range</div>
          <div className={styles.detailedsearchform__range}>
            <TextBox
              value={articlePublication.start}
              label="Start"
              width={104}
              placeholder="yyyy/MM/dd"
              onChange={handlePublicationStartChange}
              isError={!isValidDateFormats.publication.start}
              errorText="Invalid Format"
            />
            <TextBox
              value={articlePublication.end}
              label="End"
              width={104}
              placeholder="yyyy/MM/dd"
              onChange={handlePublicationEndChange}
              isError={!isValidDateFormats.publication.end}
              errorText="Invalid Format"
            />
          </div>
        </div>

        <div>
          <div className={styles.detailedsearchform__rangename}>Last Update Range</div>
          <div className={styles.detailedsearchform__range}>
            <TextBox
              value={articleLastUpdate.start}
              label="Start"
              width={104}
              placeholder="yyyy/MM/dd"
              onChange={handleLastUpdateStartChange}
              isError={!isValidDateFormats.lastUpdate.start}
              errorText="Invalid Format"
            />
            <TextBox
              value={articleLastUpdate.end}
              label="End"
              width={104}
              placeholder="yyyy/MM/dd"
              onChange={handleLastUpdateEndChange}
              isError={!isValidDateFormats.lastUpdate.end}
              errorText="Invalid Format"
            />
          </div>
        </div>
      </div>
      <div className={styles.detailedsearchform__tag}>
        <TagsAutoComplete label="Tags" />
        <TagsAutoComplete label="Tags to Exclude" />
      </div>
      <div className={styles.detailedsearchform__buttons}>
        <div>
          <Button label="Cancel" variant="secondary" onClick={handleCancelButtonClick} />
        </div>
        <div>
          <Button
            label="OK"
            disabled={
              isBlankQuery || !qiitaApiToken.length || !isValidApiKeyToken || !isCorrectDateFormat
            }
            onClick={handleOKButtonClick}
          />
        </div>
      </div>
    </div>
  )
}
