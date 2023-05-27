import { ReactNode } from 'react'

type SectionProps = {
  children: ReactNode
  className?: string
}

export const Section = (props: SectionProps) => {
  const { children, className, ...rest } = props
  return (
    <section className={className} {...rest}>
      {children}
    </section>
  )
}
