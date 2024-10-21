'use client';

import { useEffect, useState } from 'react';
import { ChartBarIcon, CalendarDaysIcon, PlusCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Divider, Image } from '@nextui-org/react';

async function fetchUserData() {
  const response = await fetch('/api/user');
  if (!response.ok) {
    return;
  }
  return response.json();
}

export default function Home() {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    getUserData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center flex-grow h-full gap-4">
      {error && <p className="text-red-500">{error}</p>}
      {userData && (
        <>
          <Image
            isBlurred
            alt={`${userData.displayName}'s profile picture`}
            src={userData.profileImage || 'https://avatars.githubusercontent.com/u/58984118?v=4'}
            width={240}
          />
          <div className="inline-block text-center justify-center">
            <span className="text-white text-3xl">Welcome, </span>
            <span className="text-green-500 text-3xl font-bold">{userData.displayName}</span>
            <br />
          </div>
          <div className="max-w-md">
            <div className="flex h-5 items-center space-x-4 text-small">
              <div>{userData.followers} followers</div>
              <Divider orientation="vertical" />
              <div>{userData.playlists} playlists</div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col items-center space-y-4 text-small max-w-[1000px] w-full">
        <div className="flex items-center gap-3 w-full">
          <ChartBarIcon className="w-32 h-32" />
          <div className="flex flex-col justify-center h-32 w-full">
            <p className="text-lg font-semibold">Your own charts</p>
            <p className="text-base text-default-500">
              View your most listened tracks, artists, and genres and switch between 3 different time periods. Your data
              is updated approximately every day.
            </p>
          </div>
        </div>
        <Divider />
        <div className="flex items-center gap-3 w-full">
          <CalendarDaysIcon className="w-32 h-32" />
          <div className="flex flex-col justify-center h-32 w-full">
            <p className="text-lg font-semibold">Your calendar</p>
            <p className="text-base text-default-500">
              Keep track of your music trends over time and view past stats for comparison.
            </p>
          </div>
        </div>
        <Divider />
        <div className="flex items-center gap-3 w-full">
          <PlusCircleIcon className="w-32 h-32" />
          <div className="flex flex-col justify-center h-32 w-full">
            <p className="text-lg font-semibold">Add to your library</p>
            <p className="text-base text-default-500">
              Quickly add new music to your library and build your personalized playlists.
            </p>
          </div>
        </div>
        <Divider />
        <div className="flex items-center gap-3 w-full">
          <ArrowPathIcon className="w-32 h-32" />
          <div className="flex flex-col justify-center h-32 w-full">
            <p className="text-lg font-semibold">Discover new music</p>
            <p className="text-base text-default-500">
              Find new tracks and artists based on your current listening habits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
