import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactNode, useMemo } from 'react'

type MenuItemProps = {
  icon: ReactNode
  to: string
}

export const MenuItem = (props: MenuItemProps) => {
  const { icon, to } = props
  const { pathname } = useRouter()

  const basePath = useMemo(() => {
    console.log()
    return `/${pathname.split('/')[1]}`
  }, [pathname])

  return (
    <Link
      href={to}
      className={`box-content flex h-full items-center border-b-2 border-transparent text-blue-600 ${
        basePath === to ? ' border-b-blue-600' : ''
      } rounded-sm hover:border-b-blue-300 `}>
      {icon}
    </Link>
  )
}
