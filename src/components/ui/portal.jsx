'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// This component creates a portal for rendering dropdowns
// outside their parent container hierarchy to avoid z-index issues
export default function Portal({ children, show }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted && show ? createPortal(
    children,
    document.body
  ) : null;
}