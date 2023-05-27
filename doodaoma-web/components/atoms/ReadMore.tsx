import { useState } from 'react'

type ReadMoreProps = {
  children: string
}

export const ReadMore = ({ children }: ReadMoreProps) => {
  const text = children
  const [isReadMore, setIsReadMore] = useState(true)
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }
  return (
    <article>
      {isReadMore ? text.slice(0, 150) : text}
      <span onClick={toggleReadMore} className="cursor-pointer text-blue-500">
        {isReadMore ? '...read more' : ' show less'}
      </span>
    </article>
  )
}
