'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextUIProvider } from '@nextui-org/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function Providers({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>{children}</NextUIProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" /> */}
    </QueryClientProvider>
  );
}
export default Providers;
