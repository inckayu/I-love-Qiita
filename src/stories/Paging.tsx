import React from 'react'
import styles from '../styles/modules/paging.module.scss'
import LinkText from './LinkText'

const Paging = () => {
  // TODO: ページングの実装
  // TODO: リンクテキストのコンポーネント作成
  return (
    <div className={styles.paging}>
      <LinkText text="prev" path="" />
      <div className={styles.paging__page}>xx/xx</div>
      <LinkText text="next" path="" />
    </div>
  )
}

export default Paging
