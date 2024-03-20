import React from 'react'

import styles from '../styles/modules/tag.module.scss'

interface TagProps {
  tag: string
}

const Tag = ({ tag }: TagProps) => {
  return <div className={styles.tag}>{tag}</div>
}

export default Tag
