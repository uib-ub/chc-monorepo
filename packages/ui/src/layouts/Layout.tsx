import React, { ReactNode } from 'react';
import { MarcusIcon } from '../icons/MarcusIcon';
import { AppShell, HeaderShell, Menu, Modal, Pane, PanesShell } from '../';

type Props = {
  children?: ReactNode
  header: React.ReactElement
  icon: React.ReactElement
  nav: React.ReactElement
  data: string
}

export const Layout: React.FC<Props> = ({ children, data, header, icon, nav }) => {
  return (
    <AppShell>
      <PanesShell>
        <Pane intent='sidebar' padded={false}>
          {icon}

          <Menu aria-label='primary navigation'>
            {nav}
          </Menu>

          <div className='grow' aria-hidden>&nbsp;</div>
          <HeaderShell>
            {header}
          </HeaderShell>
        </Pane>

        {children}
      </PanesShell>

      {process.env.NODE_ENV === 'development' && (
        <nav aria-label='secondary'>
          <div className='hidden'>
            <Modal buttonLabel="Data" title="Data">
              <pre className='text-xs max-h-[70vh] overflow-scroll border p-3'>
                {JSON.stringify(data, null, 2)}
              </pre>
            </Modal>
          </div>
        </nav>
      )}
    </AppShell>
  );
};
