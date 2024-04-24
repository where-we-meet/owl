import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import Providers from './providers';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import type { User } from '@supabase/supabase-js';
import { getSession } from '@/api/auth/getSession';
import { createClient } from '@/utils/supabase/server';
import './globals.css';

const APP_NAME = 'OWL Link';
const APP_DEFAULT_TITLE = 'OWL Link';
const APP_TITLE_TEMPLATE = '%s - OWL Link';
const APP_DESCRIPTION = '그래서 우리, 언제 어디서 만나는 거야';

export const metadata: Metadata = {
  manifest: '/manifest.json',
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF'
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
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="container">{children}</div>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
