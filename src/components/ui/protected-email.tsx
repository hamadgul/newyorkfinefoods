'use client';

import { useSyncExternalStore } from 'react';
import { CONTACT_EMAIL } from '@/lib/constants';

interface ProtectedEmailProps {
  email?: string;
  className?: string;
}

// Returns true on the client, false during SSR — no effect needed
function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ProtectedEmail({ email = CONTACT_EMAIL, className }: ProtectedEmailProps) {
  const visible = useIsClient();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };

  return (
    <a
      href="#"
      className={`protected-email ${className || ''}`}
      onClick={handleClick}
      rel="nofollow"
      aria-label={visible ? `Email ${email}` : 'Email us'}
    >
      {visible ? email : '···@···············'}
    </a>
  );
}
