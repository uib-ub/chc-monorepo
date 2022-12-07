import React from 'react'

type HeroProps = {
  label: string
  image: any
  locale: string
  creators?: any[]
}

export const Hero: React.FC<HeroProps> = ({ label, creators, image, locale }) => {
  return (
    <div className='flex flex-col gap-10 items-center'>
      <div className='h-[600px] w-full relative'>
        {image && (
          image
        )}
      </div>

      <div
        className='text-center font-light'
      >
        <h1
          className='text-6xl font-black'
        >
          {label}
        </h1>
        {creators ? (
          <div
            className='mt-5 text-lg'
          >
            by {' '}
            {creators[0].assignedActor.label[locale]}
          </div>
        ) : null}
      </div>
    </div>
  )
}