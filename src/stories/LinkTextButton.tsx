import React from 'react'
import styles from '../styles/modules/linktextbutton.module.scss'

interface LinkTextButtonProps {
  text: string
  onClick?: () => void
}

const LinkTextButton = ({ text, onClick }: LinkTextButtonProps) => {
  return (
    <button className={styles.linktextbutton} onClick={onClick}>
      {text}
    </button>
  )
}

export default LinkTextButton
