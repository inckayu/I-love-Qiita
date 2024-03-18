import React from 'react'
import styles from '../styles/modules/paging.module.scss'
import LinkTextButton from './LinkTextButton'

const Paging = () => {
  // TODO: ページングの実装
  // TODO: リンクテキストのコンポーネント作成
  return (
    <div className={styles.paging}>
      <LinkTextButton text="prev" />
      <div className={styles.paging__page}>xx/xx</div>
      <LinkTextButton text="next" />
    </div>
  )
}

export default Paging
