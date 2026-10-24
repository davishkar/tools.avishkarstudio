import { useState, useCallback } from 'react';

/**
 * Hook to copy text to clipboard with temporary success state
 * @param {number} timeout
 * @returns {{ copied: boolean, copy: (text: string) => Promise<boolean> }}
 */
export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      if (!text && text !== '') return false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(String(text));
        } else {
          // Fallback for older browsers or non-https
          const textArea = document.createElement('textarea');
          textArea.value = String(text);
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), timeout);
        return true;
      } catch (err) {
        console.error('Failed to copy text: ', err);
        setCopied(false);
        return false;
      }
    },
    [timeout]
  );

  return { copied, copy };
}

export default useClipboard;
