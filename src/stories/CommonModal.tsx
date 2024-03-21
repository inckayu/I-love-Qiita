import { Modal } from '@mui/material'
import React from 'react'

import styles from '../styles/modules/commonmodal.module.scss'

interface CommonModalProps {
  isOpenModal: boolean
  children: React.ReactNode
  onClose: React.ReactEventHandler
}

const CommonModal = ({ isOpenModal, children, onClose }: CommonModalProps) => {
  return (
    <Modal
      open={isOpenModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.commonmodal}>{children}</div>
    </Modal>
  )
}

export default CommonModal
