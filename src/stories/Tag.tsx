import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { fetchTag } from '@/functions/fetchTag'

import styles from '../styles/modules/tag.module.scss'

interface TagProps {
  tag: string
}

const Tag = ({ tag }: TagProps) => {
  const [tagImage, setTagImage] = useState<string | null>(null)

  useEffect(() => {
    fetchTag(tag)
      .then((result) => {
        setTagImage(result.icon_url)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

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
}

export default Tag
