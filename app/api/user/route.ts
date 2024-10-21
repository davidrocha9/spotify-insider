import { NextResponse } from 'next/server';

export async function fetchUserData(accessToken: string) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();

    const playlistsResponse = await fetch(`${userData.href}/playlists`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!playlistsResponse.ok) {
      throw new Error('Failed to fetch playlists');
    }

    const playlistsData = await playlistsResponse.json();

    return {
      displayName: userData.display_name,
      followers: userData.followers.total,
      playlists: playlistsData.total,
      profileImage: userData.images[0]?.url || '',
    };
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  const accessToken = request.cookies.get('spotify_access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'No access token found' }, { status: 401 });
  }

  try {
    const userData = await fetchUserData(accessToken);
    return NextResponse.json(userData);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}
