import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
// import { auth } from "@/lib/auth";
import { authService } from "./services/auth.service";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

const session= await authService.getSession()

//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

  // User is not logged in
  if (!session?.data?.user) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const activeMode = session?.data?.user?.activeMode;

  // CUSTOMER area
  if (pathname.startsWith("/customer")) {
    if (activeMode !== "CUSTOMER") {
      return NextResponse.redirect(
        new URL("/trader/dashboard", request.url)
      );
    }
  }

  // TRADER area
  if (pathname.startsWith("/trader")) {
    if (activeMode !== "TRADER") {
      return NextResponse.redirect(
        new URL("/customer/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/customer/:path*",
    "/trader/:path*",
  ],
};