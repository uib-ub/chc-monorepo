import { useRouter } from 'next/router'
import NavLink from '../Link/NavLink'

type Props = {
  value: any
}

export const MainNav: React.FC<Props> = ({ value }) => {
  const { locale, defaultLocale } = useRouter()

  return (
    <div className='flex flex-col gap-5 w-full px-5 py-3'>
      <ul className='flex gap-5 text-md text-slate-600'>
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