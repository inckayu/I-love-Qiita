import Link from 'next/link'
import React from 'react'

import styles from '../../styles/modules/linktext.module.scss'

interface LinkTextProps {
  text: string
  path: string
  disabled?: boolean
  onClick?: () => void
}

/* eslint react/display-name: 0 */
const LinkText = React.memo(({ text, path, disabled = false, onClick }: LinkTextProps) => {
  return disabled ? (
    <div className={styles.linktext__disabled}>{text}</div>
  ) : (
    <Link href={path} rel="noopener noreferrer" onClick={onClick}>
      <div className={styles.linktext}>{text}</div>
    </Link>
  )
})

export default LinkText
