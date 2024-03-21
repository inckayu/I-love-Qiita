import React from 'react'

import LinkText from './LinkText'
import styles from '../styles/modules/paging.module.scss'

const Paging = () => {
  // TODO: ページングの実装
  return (
    <div className={styles.paging}>
      <LinkText text="prev" path="" />
      <div className={styles.paging__page}>xx/xx</div>
      <LinkText text="next" path="" />
    </div>
  )
}

export default Paging
