import React from 'react'
import useSearchForm from '@/hooks/useSearchForm'
import { articleTitleState } from '@/state/articleQuery/articleTitleState'
import { useRecoilValue } from 'recoil'

import styles from '../styles/modules/maintextbox.module.scss'

const MainTextBox = () => {
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const { handleInputTitle } = useSearchForm()

  return (
    <input
      onChange={handleInputTitle}
      type="text"
      placeholder="Type some words related to titles of articles you are interested in"
      value={articleTitle}
      className={[styles['storybook-maintextbox']].join(' ')}
    />
  )
}

export default MainTextBox
