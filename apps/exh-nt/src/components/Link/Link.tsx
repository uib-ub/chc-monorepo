import * as React from "react";
import NextLink from 'next/link'

type Props = {
  href: string
  className?: string
  children: string
}

export const Link: React.FC<Props> = ({ href, className, children }) => {
  return (
    <NextLink href={href} passHref prefetch={false} className={className}>
      {children}
    </NextLink>
  )
}
