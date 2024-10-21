import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');

  const storedState = cookies().get('spotify_auth_state')?.value;

  if (!state || state !== storedState) {
    return NextResponse.json({ error: 'State mismatch' }, { status: 400 });
  }

  if (code) {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        },
        body: new URLSearchParams({
          code: code,
          redirect_uri: `${BASE_URL}/api/auth/callback`,
          grant_type: 'authorization_code',
        }).toString(),
      });

      const data = await response.json();

      const res = NextResponse.redirect(`${BASE_URL}/`);
      res.cookies.set('spotify_access_token', data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: data.expires_in,
      });

      res.cookies.set('spotify_auth_state', '', { maxAge: 0 });

      return res;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return NextResponse.json({ error: 'Failed to authenticate with Spotify' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Missing authorization code' }, { status: 400 });
  }
}
