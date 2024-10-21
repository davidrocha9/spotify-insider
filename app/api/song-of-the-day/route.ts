import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const RECENTLY_PLAYED_URL =
  "https://api.spotify.com/v1/me/player/recently-played";

interface Track {
  id: string;
  name: string;
  artists: { name: string }[];
  album: { name: string; images: { url: string }[] };
}

interface RecentlyPlayedTrack {
  track: Track;
}

function determineSongOfTheDay(tracks: RecentlyPlayedTrack[]) {
  const songCount: { [key: string]: { count: number; track: Track } } = {};

  tracks.forEach(({ track }) => {
    const songId = track.id;

    if (!songCount[songId]) {
      songCount[songId] = { count: 0, track };
    }
    songCount[songId].count += 1;
  });

  const songOfTheDay = Object.values(songCount).reduce((prev, current) =>
    current.count > prev.count ? current : prev,
  );

  return songOfTheDay.track;
}

export async function GET() {
  const accessToken = cookies().get("spotify_access_token")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No access token found" },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(`${RECENTLY_PLAYED_URL}?limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch recently played tracks");
    }

    const { items: recentTracks } = await response.json();

    if (!Array.isArray(recentTracks)) {
      return NextResponse.json(
        { error: "Recent tracks is not an array" },
        { status: 500 },
      );
    }

    const songOfTheDay = determineSongOfTheDay(recentTracks);

    return NextResponse.json(songOfTheDay);
  } catch (error) {
    console.error("Error fetching Spotify recently played tracks:", error);

    return NextResponse.json(
      { error: "Failed to fetch recently played tracks" },
      { status: 500 },
    );
  }
}
