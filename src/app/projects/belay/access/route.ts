import { NextResponse } from "next/server";

const BELAY_COOKIE = "belay_access";
const BELAY_PATH = "/projects/belay";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");
  const expectedPassword = process.env.BELAY_PASSWORD;

  if (!expectedPassword) {
    return NextResponse.json(
      {
        error:
          "BELAY_PASSWORD is not configured. Set the environment variable to enable access.",
      },
      { status: 500 },
    );
  }

  if (typeof password !== "string" || password !== expectedPassword) {
    const url = new URL(`${BELAY_PATH}/access`, request.url);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url);
  }

  const nextUrl = new URL(request.url);
  const redirectTo = nextUrl.searchParams.get("next") ?? BELAY_PATH;
  const response = NextResponse.redirect(new URL(redirectTo, request.url));

  response.cookies.set(BELAY_COOKIE, "granted", {
    httpOnly: true,
    path: BELAY_PATH,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
