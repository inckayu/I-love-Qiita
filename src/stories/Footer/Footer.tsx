import GitHubIcon from '@mui/icons-material/GitHub'
import { IconButton, Link } from '@mui/material'

import styles from '../../styles/modules/footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__copyright}>© 2024 Yuki Kataoka</div>
        <IconButton size="small">
          <Link
            href="https://github.com/inckayu/I-love-Qiita"
            className={styles.footer__iconbutton}
          >
            <GitHubIcon />
          </Link>
        </IconButton>
      </div>
    </footer>
  )
}

export default Footer
