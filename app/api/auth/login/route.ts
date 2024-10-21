import { NextResponse } from "next/server";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

function generateRandomString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

export async function GET() {
  const redirectUri = `${BASE_URL}/api/auth/callback`;
  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-top-read user-read-recently-played";

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: CLIENT_ID!,
      scope: scope,
      redirect_uri: redirectUri,
      state: state,
      show_dialog: "true",
    }).toString();

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("spotify_auth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  return response;
}
