import Link from 'next/link'

import { Button } from '@/stories/Button/Button'
import Footer from '@/stories/Footer/Footer'

import styles from '../styles/modules/404.module.scss'

const Custom404 = () => {
  return (
    <>
      <main className={styles.custom404}>
        <div className={styles.custom404__wrapper}>
          <h1 className={styles.custom404__title}>404 - Page Not Found</h1>
          <div className={styles.custom404__message}>
            Oops! The page you&apos;re looking for can&apos;t be found. It might have been moved or
            deleted.
          </div>
          <div className={styles.custom404__button}>
            <Link href="/">
              <Button size="large" label="Back to Home" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Custom404
