import React from 'react'
import styles from '../styles/modules/button.module.scss'
import { getButtonVariant } from '@/functions/getButtonVariant'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  label: string
  disabled?: boolean
  onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  label,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        styles['storybook-button'],
        styles[`storybook-button--${size}`],
        getButtonVariant(variant, disabled),
      ].join(' ')}
      {...props}
    >
      {label}
    </button>
  )
}
