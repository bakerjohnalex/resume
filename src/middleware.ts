import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BELAY_COOKIE = "belay_access";
const BELAY_PATH = "/projects/belay";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === `${BELAY_PATH}/access`) {
    return NextResponse.next();
  }

  if (pathname.startsWith(BELAY_PATH)) {
    const accessCookie = request.cookies.get(BELAY_COOKIE)?.value;

    if (accessCookie === "granted") {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = `${BELAY_PATH}/access`;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/projects/belay/:path*"],
};
