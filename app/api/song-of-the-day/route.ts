import { NextResponse } from 'next/server';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played';

function getTodayDate() {
  return new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
}

function determineSongOfTheDay(tracks) {
  const songCount = {};

  tracks.forEach(({ track }) => {
    const songId = track.id;
    if (!songCount[songId]) {
      songCount[songId] = { count: 0, track };
    }
    songCount[songId].count += 1;
  });
  g;
  const songOfTheDay = Object.values(songCount).reduce((prev, current) =>
    current.count > prev.count ? current : prev
  );

  return songOfTheDay.track;
}

function storeSongOfTheDay(song) {
  if (typeof window !== 'undefined') {
    const today = getTodayDate();
    const storedSongs = JSON.parse(localStorage.getItem('songsOfTheDay')) || {};

    if (!storedSongs[today]) {
      storedSongs[today] = song;
      localStorage.setItem('songsOfTheDay', JSON.stringify(storedSongs));
    }
  }
}

export async function GET(request) {
  const accessToken = request.cookies.get('spotify_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token found' }, { status: 401 });
  }

  try {
    const response = await fetch(`${RECENTLY_PLAYED_URL}?limit=50`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recently played tracks');
    }

    const { items: recentTracks } = await response.json();

    if (!Array.isArray(recentTracks)) {
      return NextResponse.json({ error: 'Recent tracks is not an array' }, { status: 500 });
    }

    const songOfTheDay = determineSongOfTheDay(recentTracks);

    return NextResponse.json(songOfTheDay);
  } catch (error) {
    console.error('Error fetching Spotify recently played tracks:', error);
    return NextResponse.json({ error: 'Failed to fetch recently played tracks' }, { status: 500 });
  }
}