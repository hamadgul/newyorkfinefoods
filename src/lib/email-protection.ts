/**
 * Email protection utilities to prevent email scraping
 */

/**
 * Obfuscates email address for display in HTML
 * Uses character encoding to make it harder for scrapers
 */
export function obfuscateEmail(email: string): string {
  return email.split('').map(char => `&#${char.charCodeAt(0)};`).join('');
}

/**
 * Creates a protected mailto link using base64 encoding
 * Note: This function is deprecated in favor of ProtectedEmail component
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createProtectedMailto(_email: string): string {
  // This function is kept for potential future use
  // Currently, we use the ProtectedEmail component instead
  return `javascript:void(0);`;
}

/**
 * Generates props for a React component that displays email safely
 */
export function getProtectedEmailProps(email: string) {
  const [username, domain] = email.split('@');
  
  return {
    'data-username': Buffer.from(username).toString('base64'),
    'data-domain': Buffer.from(domain).toString('base64'),
    'data-email': obfuscateEmail(email),
    className: 'protected-email',
    rel: 'nofollow',
  };
}
