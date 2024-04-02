import { chain } from "@/middlewares/chain";
import { authToken } from "./middlewares/authToken";
import { protectRoute } from "./middlewares/protectRoute";

export default chain([authToken, protectRoute]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
