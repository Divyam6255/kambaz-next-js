'use client';

import { useEffect } from 'react';
import './styles.css';

export default function AccountPage() {
  useEffect(() => {
    window.location.href = '/kambaz/account/signin';
  }, []);

  return (
    <div className="loading">
      <p>Redirecting to signin...</p>
    </div>
  );
}