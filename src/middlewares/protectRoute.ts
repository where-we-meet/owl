import { NextResponse, type NextFetchEvent, type NextRequest } from 'next/server';

import { CustomMiddleware } from './chain';
import { createClient } from '@/utils/supabase/server';

export function protectRoute(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    const pathname = request.nextUrl.pathname;
    const protectedPath = ['/start', '/room', '/my-owl'];

    if (protectedPath.some((path) => pathname.startsWith(path))) {
      if (error || !data?.user) {
        return NextResponse.redirect(new URL(`/login`, request.url));
      }
    }

    return middleware(request, event, response);
  };
}
