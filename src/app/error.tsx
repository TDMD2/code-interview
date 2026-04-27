'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-error/10 text-error p-lg rounded-xl border border-error/20 max-w-md text-center">
        <h2 className="font-headline-md mb-2">Something went wrong!</h2>
        <p className="font-body-sm text-on-surface mb-6">
          We encountered an error loading the commute data.
        </p>
        <button
          onClick={() => reset()}
          className="bg-error text-on-error px-md py-sm rounded-lg font-label-caps hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
