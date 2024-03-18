import React from 'react'
import styles from '../styles/modules/circle.module.scss'

type Props = {
  color: 'red' | 'blue' | 'green'
  size: 'small' | 'large'
}

const Circle = ({ color = 'red', size = 'small' }: Props) => {
  return (
    <div
      className={styles.circle}
      style={{
        backgroundColor: color,
        width: size === 'small' ? '50px' : '100px',
        height: size === 'small' ? '50px' : '100px',
      }}
    />
  )
}

export default Circle
