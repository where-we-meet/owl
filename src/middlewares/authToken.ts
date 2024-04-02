import {
  NextResponse,
  type NextFetchEvent,
  type NextRequest,
} from "next/server";

import { CustomMiddleware } from "./chain";
import { updateSession } from "@/utils/supabase/middleware";

export function authToken(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const response = NextResponse.next();
    await updateSession(request);
    return middleware(request, event, response);
  };
}
