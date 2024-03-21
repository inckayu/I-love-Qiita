import Link from 'next/link'
import React from 'react'

import styles from '../styles/modules/linktext.module.scss'

interface LinkTextProps {
  text: string
  path: string
  onClick?: () => void
}

const LinkText = ({ text, path, onClick }: LinkTextProps) => {
  return (
    <Link href={path} rel="noopener noreferrer" onClick={onClick}>
      <div className={styles.linktext}>{text}</div>
    </Link>
  )
}

export default LinkText
