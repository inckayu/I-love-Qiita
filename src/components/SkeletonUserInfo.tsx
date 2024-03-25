import styles from '../styles/modules/userinfo.module.scss'

const SkeletonUserInfo = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__left}>
        <div className={styles.skeleton__icon} />
      </div>
      <div className={styles.skeleton__right}>
        <div className={styles.skeleton__name} />
      </div>
    </div>
  )
}

export default SkeletonUserInfo
