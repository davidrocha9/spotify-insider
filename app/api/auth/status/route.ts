import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const accessToken = cookies().get('spotify_access_token')?.value;

  if (accessToken) {
    return NextResponse.json({ isAuthenticated: true });
  } else {
    return NextResponse.json({ isAuthenticated: false });
  }
}
