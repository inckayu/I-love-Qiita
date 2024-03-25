import React from 'react'

import styles from '../../styles/modules/textbox.module.scss'

interface TextBoxProps {
  value: string
  label: string
  width?: number
  placeholder?: string
  required?: boolean
  errorText?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isError?: boolean
}

const TextBox = ({
  value,
  label,
  width = 240,
  placeholder,
  required = false,
  errorText,
  onChange,
  isError = false,
}: TextBoxProps) => {
  return (
    <div className={styles.textbox}>
      <div>
        <label className={styles.textbox__label}>
          {label}
          {required ? <span className={styles.textbox__required}>&nbsp;*</span> : null}
        </label>
      </div>

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`${styles.textbox__body} ${isError ? styles.textbox__error : ''}`}
        style={{ width }}
      />
      {isError ? <div className={styles.textbox__errortext}>{errorText}</div> : null}
    </div>
  )
}

export default TextBox
