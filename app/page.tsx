'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Landing page is Labs page
    router.push('/labs');
  }, [router]);

  return null;
}
