import createIntlMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

// Create the next-intl middleware
const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 1. Run the next-intl middleware first (handles locale detection/redirect)
  const intlResponse = intlMiddleware(request);

  // 2. Refresh the Supabase auth session
  const { user } = await updateSession(request);

  // 3. Determine the current locale from the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameLocale = routing.locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  const locale = pathnameLocale || routing.defaultLocale;

  // 4. Protect admin routes (except the login page)
  const isAdminRoute =
    pathname.startsWith(`/${locale}/admin`) ||
    pathname.startsWith("/admin");
  const isLoginPage =
    pathname === `/${locale}/admin/login` ||
    pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage && !user) {
    const loginUrl = new URL(`/${locale}/admin/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
