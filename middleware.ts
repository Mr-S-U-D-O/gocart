import { clerkMiddleware } from "@clerk/nextjs/server";

const hasClerkKeys =
  Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) &&
  Boolean(process.env.CLERK_SECRET_KEY);

export default function middleware(req: any, evt: any) {
  if (!hasClerkKeys) {
    return;
  }
  return clerkMiddleware()(req, evt);
}



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search param
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
