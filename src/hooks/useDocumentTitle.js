import { useEffect } from 'react';

/**
 * Hook to update page document title dynamically
 * @param {string} title
 * @param {string} baseTitle
 */
export function useDocumentTitle(title, baseTitle = '360° Tools by Avishkar Studio') {
  useEffect(() => {
    if (title) {
      document.title = `${title} — ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [title, baseTitle]);
}

export default useDocumentTitle;
