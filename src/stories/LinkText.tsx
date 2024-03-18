import React from 'react'
import styles from '../styles/modules/linktext.module.scss'
import Link from 'next/link'

interface LinkTextProps {
  text: string
  path: string
}

const LinkText = ({ text, path }: LinkTextProps) => {
  return (
    <Link href={path} rel="noopener noreferrer">
      <div className={styles.linktext}>{text}</div>
    </Link>
  )
}

export default LinkText
