import React from 'react'
import styles from '../styles/modules/textbox.module.scss'

interface TextBoxProps {
  value: string
  placeholder: string
  required?: boolean
  errorText?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isError?: boolean
}

const TextBox = ({
  value,
  placeholder,
  required = false,
  errorText,
  onChange,
  isError,
}: TextBoxProps) => {
  return (
    <div className={styles.textbox}>
      {required ? (
        <div className={styles.textbox__required}>required *</div>
      ) : null}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.textbox__body}
      />
      {isError ? (
        <div className={styles.textbox__errortext}>{errorText}</div>
      ) : null}
    </div>
  )
}

export default TextBox
