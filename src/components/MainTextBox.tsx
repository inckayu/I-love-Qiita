import React from 'react'
import { useRecoilValue } from 'recoil'

import useSearchForm from '@/hooks/useSearchForm'

import { articleTitleState } from '@/state/articleQuery/articleTitleState'

import styles from '../styles/modules/maintextbox.module.scss'

interface MainTextBoxProps {
  placeholder?: string
  disabled?: boolean
}

const MainTextBox = ({ placeholder, disabled = false }: MainTextBoxProps) => {
  const articleTitle = useRecoilValue<string>(articleTitleState)
  const { handleInputTitle } = useSearchForm()

  return (
    <input
      onChange={handleInputTitle}
      type="text"
      placeholder={placeholder}
      value={articleTitle}
      className={[
        styles['storybook-maintextbox'],
        disabled ? styles['storybook-maintextbox--disabled'] : null,
      ].join(' ')}
      disabled={disabled}
    />
  )
}

export default MainTextBox
