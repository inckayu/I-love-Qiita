import React from 'react'
import styles from '../styles/modules/button.module.scss'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  label: string
  disabled?: boolean
  onClick?: (() => void) | React.MouseEventHandler<HTMLButtonElement>
}

const getMode = (variant: 'primary' | 'secondary', disabled: boolean) => {
  if (disabled) return styles['storybook-button--disabled']
  switch (variant) {
    case 'primary':
      return styles['storybook-button--primary']
    case 'secondary':
      return styles['storybook-button--secondary']
    default:
      return ''
  }
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
        getMode(variant, disabled),
      ].join(' ')}
      {...props}
    >
      {label}
      {/* <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style> */}
    </button>
  )
}
