import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith("/login")

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/", req.url))
      }

      return null
    }

    if (!isAuth) {
      let from = req.nextUrl.pathname
      if (req.nextUrl.search) {
        from += req.nextUrl.search
      }

      return NextResponse.redirect(
        new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
      )
    }

    if (
      req.nextUrl.pathname.startsWith("/provider-dashboard") &&
      req.nextauth.token?.role !== "Provider"
    ) {
      return new NextResponse("You are not authorized")
    }

    if (
      req.nextUrl.pathname.startsWith("/user-dashboard") &&
      req.nextauth.token?.role !== "Client"
    ) {
      return new NextResponse("You are not authorized")
    }

    if (
      req.nextUrl.pathname === "/become-a-provider" &&
      req.nextauth.token?.role === "Provider"
    ) {
      return NextResponse.redirect(new URL("/provider-dashboard", req.url))
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    "/provider-dashboard/:path*",
    "/user-dashboard/:path*",
    "/login",
    "/become-a-provider",
  ],
}
