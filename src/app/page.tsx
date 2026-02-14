'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useNoGenerator } from '@/hooks/useNoGenerator';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GeneratorCard from '@/components/GeneratorCard';
import ActionButtons from '@/components/ActionButtons';
import CategorySelector from '@/components/CategorySelector';
import HowItWorks from '@/components/HowItWorks';
import ApiDocsPreview from '@/components/ApiDocsPreview';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { decodeReasonParam } from '@/lib/utils';

function HomePage() {
  const { reason, loading, error, category, generate, setCategory, setReason } = useNoGenerator();
  const searchParams = useSearchParams();

  // Check for shared reason in URL
  useEffect(() => {
    const sharedReason = searchParams.get('reason');
    if (sharedReason) {
      const decoded = decodeReasonParam(sharedReason);
      if (decoded) {
        setReason(decoded);
      }
    }
  }, [searchParams, setReason]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <GeneratorCard reason={reason} loading={loading} />
        <ActionButtons reason={reason} loading={loading} onGenerate={generate} />
        <CategorySelector selected={category} onSelect={setCategory} />

        {error && (
          <p className="mt-4 text-center text-sm text-red-500" role="alert">
            {error}
          </p>
        )}

        <HowItWorks />
        <ApiDocsPreview />
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
