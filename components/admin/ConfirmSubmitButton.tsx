'use client';

import type { MouseEvent, ReactNode } from 'react';

export default function ConfirmSubmitButton({
  children,
  className,
  confirmMessage,
}: {
  children: ReactNode;
  className?: string;
  confirmMessage: string;
}) {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    if (!window.confirm(confirmMessage)) {
      e.preventDefault();
    }
  }

  return (
    <button type="submit" className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
