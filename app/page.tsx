'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Landing page is Kambaz application
    router.push('/kambaz/account/signin');
  }, [router]);

  return null;
}
