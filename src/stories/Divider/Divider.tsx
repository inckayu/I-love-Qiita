import React from 'react'

interface DividerProps {
  widthUnit: '%' | 'px'
  width: number
  thick: number
  color: string
}

/* eslint react/display-name: 0 */
const Divider = React.memo(({ widthUnit, width, thick, color }: DividerProps) => {
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
})

export default Divider
