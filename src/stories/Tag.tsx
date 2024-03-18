import React from 'react'

interface TagProps {
  tag: string
}

const Tag = ({ tag }: TagProps) => {
  return <div>{tag}</div>
}

export default Tag
