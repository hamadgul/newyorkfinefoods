'use client';

import { CONTACT_EMAIL } from '@/lib/constants';

interface ProtectedEmailProps {
  email?: string;
  className?: string;
}

export function ProtectedEmail({ email = CONTACT_EMAIL, className }: ProtectedEmailProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const username = Buffer.from(email.split('@')[0]).toString('base64');
    const domain = Buffer.from(email.split('@')[1]).toString('base64');
    
    // Store encoded data in data attributes
    const element = e.currentTarget;
    element.dataset.username = username;
    element.dataset.domain = domain;
    
    // Reconstruct and open mailto
    window.location.href = `mailto:${email}`;
  };
  
  return (
    <a
      href="#"
      className={`protected-email ${className || ''}`}
      onClick={handleClick}
      data-email={email.split('').map(char => `&#${char.charCodeAt(0)};`).join('')}
      rel="nofollow"
    >
      {email.split('@')[0]}@{email.split('@')[1]}
    </a>
  );
}
