import styles from '../styles/modules/button.module.scss'

export const getButtonVariant = (variant: 'primary' | 'secondary', disabled: boolean) => {
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
