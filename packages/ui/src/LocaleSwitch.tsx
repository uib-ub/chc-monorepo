import React from 'react'
import { Select } from './Select'
import { GlobeAltIcon } from './icons/GlobeAltIcon'

interface LocaleSwitchProps {
  lite?: boolean
  className?: string
  locales: string[]
  locale: string
  defaultLocale: string
  asPath: string
  labels: {
    [key: string]: string
  }
}

export const LocaleSwitch: React.FC<LocaleSwitchProps> = ({
  lite,
  className,
  locales,
  locale,
  defaultLocale,
  asPath,
  labels
}) => {
  const selected = locales?.find(l => locale === l)

  return (
    <div className="relative">
      <Select
        title="Change language"
        className={className}
        onChange={(e: any) => {
          if (e.key !== locale) {
            location.href = `${e.key !== defaultLocale ? `${e.key}/${asPath}` : asPath}`
          }
        }}
        selected={{
          key: selected || '',
          name: (
            <div className="flex items-center gap-2">
              <GlobeAltIcon className="w-5 h-5" />
              <span className={lite ? 'hidden' : ''}>{labels[selected || '']}</span>
            </div>
          )
        }}
        options={locales.map(locale => ({
          key: locale,
          name: labels[locale]
        }))}
      />
    </div>
  )
}