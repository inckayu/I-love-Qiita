import { CircularProgress } from '@mui/material'
import React from 'react'

import { getButtonVariant } from '../../functions/getButtonVariant'
import styles from '../../styles/modules/button.module.scss'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  label: string
  disabled?: boolean
  isLoading?: boolean
  onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement>
}

/* eslint react/display-name: 0 */
export const Button = React.memo(
  ({
    variant = 'primary',
    size = 'medium',
    label,
    disabled = false,
    isLoading = false,
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
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          // FIXME: サークルの大きさはsizeによって変えたい
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          <div>{label}</div>
        )}
      </button>
    )
  }
)
