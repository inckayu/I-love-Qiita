import { BasicUserInfo } from '@/types/Article'
import React from 'react'
import styles from '../styles/modules/userinfo.module.scss'
import Image from 'next/image'

interface UserInfoProps {
  user: BasicUserInfo
}

const UserInfo = ({ user }: UserInfoProps) => {
  console.log(user)
  return (
    <div className={styles.userinfo}>
      <div className={styles.userinfo__left}>
        <Image
          width={48}
          height={48}
          className={styles.userinfo__icon}
          src={user.profile_image_url}
          alt="author's icon"
        />
      </div>
      <div className={styles.userinfo__right}>
        {user.organization ? (
          <div className={styles.userinfo__organization}>
            {user.organization}
          </div>
        ) : null}
        <div className={styles.userinfo__name}>{user.name}</div>
      </div>
    </div>
  )
}

export default UserInfo
