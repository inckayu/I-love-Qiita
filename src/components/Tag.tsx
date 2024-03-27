import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

import { fetchTag } from '../functions/fetchTag'
import { qiitaApiTokenState } from '../state/qiitaApiTokenState'
import styles from '../styles/modules/tag.module.scss'

interface TagProps {
  tag: string
}

/* eslint react/display-name: 0 */
const Tag = React.memo(({ tag }: TagProps) => {
  const [tagImage, setTagImage] = useState<string | null>(null)
  const qiitaApiToken = useRecoilValue(qiitaApiTokenState)

  useEffect(() => {
    fetchTag(tag, qiitaApiToken)
      .then((result) => {
        setTagImage(result.icon_url)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [qiitaApiToken, tag])

  return (
    <div className={styles.tag}>
      {tagImage ? (
        <div className={styles.tag__image}>
          <Image src={tagImage} width={16} height={16} alt={tag} />
        </div>
      ) : null}
      <div>{tag}</div>
    </div>
  )
})

export default Tag
