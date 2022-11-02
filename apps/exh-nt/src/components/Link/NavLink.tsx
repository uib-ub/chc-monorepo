import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  className?: string
  children: string | React.ReactNode
  href: string
}

export const NavLink: React.FC<Props> = ({ href, children, className }) => {
  const { asPath } = useRouter()
  const isActive = asPath === href

  return (
    <Link href={href} passHref>
      <a className={`${isActive ? 'text-red-500' : ''}`}>
        {children}
      </a>
    </Link>
  )
}

export default NavLink
