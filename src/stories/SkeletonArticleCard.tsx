import SkeletonUserInfo from './SkeletonUserInfo'
import styles from '../styles/modules/articlecard.module.scss'

const SkeletonArticleCard = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__left}>
        <div>
          <div className={styles.skeleton__title} />
          <div className={styles.skeleton__date} />
        </div>
        <SkeletonUserInfo />
      </div>
      <div className={styles.skeleton__wrapper}>
        <div className={styles.skeleton__right} />
        <div className={styles.skeleton__right} />
        <div className={styles.skeleton__right} />
        <div className={styles.skeleton__right} />
      </div>
    </div>
  )
}

export default SkeletonArticleCard
