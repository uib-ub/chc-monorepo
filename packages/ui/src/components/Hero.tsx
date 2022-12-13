import React from 'react'
import { Link } from './Link'

type HeroProps = {
  label: string
  image: any
  figCaption: any
  locale: string
  creators?: any[]
  about?: any
}

export const Hero: React.FC<HeroProps> = ({ label, creators, image, figCaption, locale }) => {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <figure className='w-full relative'>
        <div className='h-[600px] w-full relative bg-black'>
          {image && (
            image
          )}
        </div>

        {figCaption && (
          figCaption
        )}
      </figure>

      <div className='text-center ' >
        <h1 className='text-6xl font-black' >
          {label}
        </h1>
        {creators ? (
          <div className='mt-5 text-lg font-light' >
            by {' '}
            {creators[0].assignedActor.label[locale]}
          </div>
        ) : null}
      </div>
    </div >
  )
}