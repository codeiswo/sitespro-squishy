import Link from 'next/link';
import { Droplets, ArrowLeft } from 'lucide-react';

export const runtime = 'edge';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark">
      <div className="text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-hero-gradient flex items-center justify-center mx-auto mb-8 shadow-glow-lg">
          <Droplets className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-6xl font-heading font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl font-heading font-semibold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let us help you find the right water filter.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 btn-primary text-base px-8 py-4"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
