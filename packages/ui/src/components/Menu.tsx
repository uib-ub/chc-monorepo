import React from 'react'
import { Popover } from '@headlessui/react'
import { Bars4Icon } from '@heroicons/react/20/solid'
import { usePopper } from '../utils/use-popper'

type MenuProps = {
  children: React.ReactNode
}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  const [trigger, container] = usePopper({
    strategy: 'fixed',
    placement: 'right-start',
    modifiers: [
      { name: 'offset', options: { offset: [0, 10] } },
      {
        name: 'sameWidth',
        enabled: true,
        fn({ state }) {
          state.styles.popper.minWidth = `${state.rects.reference.width}px`
        },
        phase: 'beforeWrite',
        requires: ['computeStyles']
      }
    ]
  })

  return (
    <Popover>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of the chevron icon. */
        <>
          <Popover.Button
            ref={trigger}
            className='flex flex-col items-center text-slate-600'
          >
            <Bars4Icon className={open ? 'w-6 h-6 rotate-180 transform' : 'w-6 h-6'} />
            Menu
          </Popover.Button>
          <Popover.Panel
            ref={container}
            className="border border-black/5 dark:border-white/20 relative z-30 max-h-64 overflow-auto rounded-md bg-white py-1 text-sm shadow-lg dark:bg-neutral-800"
          >
            {children}
          </Popover.Panel>
        </>
      )}
    </Popover>
  )
}