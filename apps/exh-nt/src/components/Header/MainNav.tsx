import { useRouter } from 'next/router'
import React from 'react';
import { NavLink } from 'ui'

export interface Label {
  _type: string;
  en: string;
  no: string;
}
export interface Target {
  _id: string;
  label: Label;
  route: string;
}

export interface Link {
  _key: string;
  _type: string;
  children?: any;
  target: Target;
}
export interface Section {
  _key: string;
  _type: string;
  label: Label;
  links: Link[];
  target: Target;
}

export interface ToC {
  _createdAt: Date;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: Date;
  label: Label;
  sections: Section[];
}
export interface MainNavProps {
  value: ToC
}


export const MainNav: React.FC<MainNavProps> = ({ value }) => {
  const { locale } = useRouter()

  return (
    <ul className='gap-5 text-lg text-slate-600 p-5'>
      {value?.sections && value?.sections.map((section: any, index: number) => (
        <React.Fragment key={section._key}>
          {section?.label ?
            <li key={section._key} className='border-b text-md font-light first:mt-0 mt-4'>
              {section?.label?.[locale || ''] || section?.target?.label?.[locale || '']}
            </li>
            : null
          }
          {section?.target ?
            <li key={section._key} className='text-md font-light first:mt-0 mt-4'>
              <NavLink href={`/${section?.target?.route}`}>
                {section?.target?.label?.[locale || '']}
              </NavLink>
            </li>
            : null
          }
          <ul>
            {section?.links && section?.links.map((link: any) => (
              <li key={link._key}>
                <NavLink href={`/${link?.target?.route}`}>
                  {link?.label?.[locale || ''] || link?.target?.label?.[locale || '']}
                </NavLink>
              </li>
            ))}
          </ul>
        </React.Fragment>
      ))}
    </ul>

  )
}