import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = PropsWithChildren;

function Portal({ children }: PortalProps) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) {
    return null;
  }
  return createPortal(children, modalRoot);
}

export default Portal;
