'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import QuizTakePage from '../take/page';

// Faculty preview is essentially the same as the take page
// but we show a banner indicating it's preview mode
export default function QuizPreviewPage({ params }) {
  const unwrappedParams = use(params);
  return <QuizTakePage params={Promise.resolve(unwrappedParams)} />;
}
