import React from 'react'

interface DividerProps {
  widthUnit: '%' | 'px'
  width: number
  thick: number
  color: string
}

const Divider = ({ widthUnit, width, thick, color }: DividerProps) => {
  return (
    <div
      style={{
        width: `${width}${widthUnit}`,
        height: `${thick}px`,
        backgroundColor: color,
        margin: '0 auto',
      }}
    />
  )
}

export default Divider
