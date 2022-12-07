import { useRouter } from 'next/router'
import NavLink from '../Link/NavLink'

type Props = {
  value: any
}

export const MainNav: React.FC<Props> = ({ value }) => {
  const { locale } = useRouter()

  return (
    <ul className='gap-5 text-lg text-slate-600 p-5'>
      {value?.sections && value?.sections.map((section: any) => (
        <>
          {section?.label ?
            <li className='border-b text-md font-light first:mt-0 mt-4'>{section?.label?.[locale || ''] || section?.target?.label?.[locale || '']}</li>
            : null
          }
          {section?.target ?
            <li className='text-md font-light first:mt-0 mt-4'><NavLink href={`/${section?.target?.route}`}>{section?.target?.label?.[locale || '']}</NavLink></li>
            : null
          }
          <ul>
            {section?.links && section?.links.map((link: any) => (
              <li>
                <NavLink href={`/${link?.target?.route}`}>
                  {link?.label?.[locale || ''] || link?.target?.label?.[locale || '']}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      ))}
    </ul>

  )
}