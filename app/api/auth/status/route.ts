import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const accessToken = request.cookies.get('spotify_access_token')?.value;

  if (accessToken) {
    return NextResponse.json({ isAuthenticated: true });
  } else {
    return NextResponse.json({ isAuthenticated: false });
  }
}
