import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("spotify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/recently-played?limit=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recently played tracks");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Spotify recently played tracks:", error);

    return NextResponse.json(
      { error: "Failed to fetch recently played tracks" },
      { status: 500 },
    );
  }
}
