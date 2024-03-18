import React from 'react'
import { articleTitleState } from '@/state/articleTitleState'
import { useRecoilState } from 'recoil'
import styles from '../styles/modules/maintextbox.module.scss'

const MainTextBox = () => {
  const [articleTitle, setArticleTitle] =
    useRecoilState<string>(articleTitleState)

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticleTitle(e.target.value)
  }
  return (
    <input
      onChange={handleInputTitle}
      type="text"
      placeholder="Type some words related to articles you are interested in"
      value={articleTitle}
      className={[styles['storybook-maintextbox']].join(' ')}
    />
  )
}

export default MainTextBox
