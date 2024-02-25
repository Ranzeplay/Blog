import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export default async function handler(request: NextRequest) {
  let token = request.cookies.get("token")?.value || "";

  if (bcrypt.compareSync(process.env.ACCESS_TOKEN || "", token)) {
    return NextResponse.next();
  } else {
    if (unprotectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

const unprotectedRoutes = ["/api/auth", "/"];
