import { NextRequest, NextResponse } from "next/server";

// import { authMiddleware } from "@clerk/nextjs/server";

// // See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
// export default authMiddleware({
//   publicRoutes: [
//     "/",
//   ],


// });

export async function middleware(request: NextRequest) {
  return NextResponse.next({request});
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
