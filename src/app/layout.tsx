import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Providers from './providers';
import './globals.css';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getSession } from '@/api/auth';
import { createClient } from '@/utils/supabase/server';
import { User } from '@supabase/supabase-js';
import getQueryClient from '@/utils/getQueryClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery<User | null>({
    queryKey: ['auth'],
    queryFn: () => getSession(supabase)
  });

  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <Header />
          <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
