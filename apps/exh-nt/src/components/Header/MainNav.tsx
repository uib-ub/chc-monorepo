import { useRouter } from 'next/router'
import NavLink from '../Link/NavLink'

type Props = {
  value: any
}

export const MainNav: React.FC<Props> = ({ value }) => {
  const { locale, defaultLocale } = useRouter()

  return (
    <div className='flex gap-5 w-full'>

      <ul className='flex gap-5'>
        {value && value.tree?.map((child: any) => (
          <NavLink
            key={child._key}
            href={`/${child.value.reference.route}`}
          >
            {child.value.reference.label[locale || ''] || child.value.reference.label[defaultLocale || '']}
          </NavLink>
        ))}
      </ul>
    </div>
  )
}