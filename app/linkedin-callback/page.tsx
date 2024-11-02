'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLinkedInCallback } from '@/hooks/useLinkedIn';

export default function LinkedInCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');
  
  const { mutate: handleCallback, isLoading } = useLinkedInCallback(
    code, 
    state, 
    error, 
    errorDescription
  );

  // Use ref to track if callback has been executed
  const hasCalledBack = useRef(false);

  useEffect(() => {
    if (!hasCalledBack.current) {
      hasCalledBack.current = true;
      handleCallback();
    }
  }, [handleCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="text-xl font-semibold text-gray-900">
          Connecting your LinkedIn account
        </h2>
        <p className="text-gray-500">
          Please wait while we complete the connection...
        </p>
      </div>
    </div>
  );
} 