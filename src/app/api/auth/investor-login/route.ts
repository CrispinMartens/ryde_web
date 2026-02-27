import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (
    email === process.env.INVESTOR_EMAIL &&
    password === process.env.INVESTOR_PASSWORD
  ) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("ryde-session", "investor", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return response;
  }

  return NextResponse.json(
    { error: "Invalid email or password" },
    { status: 401 }
  );
}
