import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const accessToken = cookies().get("spotify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 },
    );
  }

  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get("time_range") || "short_term";

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top artists");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Spotify top artists:", error);

    return NextResponse.json(
      { error: "Failed to fetch top artists" },
      { status: 500 },
    );
  }
}
