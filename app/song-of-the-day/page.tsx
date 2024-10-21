'use client';

import React, { useEffect, useState } from 'react';
import { Song } from '@/components/song-of-the-day/song';
import TableDailySongs from '@/components/song-of-the-day/table-daily-song';
import { CircularProgress } from '@nextui-org/react';

const getTodayDate = () => new Date().toISOString().split('T')[0];

export default function SongOfTheDayPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [songOfTheDay, setSongOfTheDay] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        setIsAuthenticated(data.isAuthenticated);

        if (data.isAuthenticated) {
          fetchSongOfTheDay();
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch authentication status:', error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const fetchSongOfTheDay = async () => {
    const today = getTodayDate();
    const storedSongsString = localStorage.getItem('songsOfTheDay');
    const storedSongs = storedSongsString ? JSON.parse(storedSongsString) : {};

    if (storedSongs[today]) {
      setSongOfTheDay(storedSongs[today]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/song-of-the-day');

      if (res.ok) {
        const songData = await res.json();
        setSongOfTheDay(songData);

        storedSongs[today] = songData;
        localStorage.setItem('songsOfTheDay', JSON.stringify(storedSongs));
      } else {
        console.error('Failed to fetch Song of the Day');
      }
    } catch (error) {
      console.error('Error fetching Song of the Day:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-row items-stretch justify-center flex-grow h-full gap-10">
      <div className="flex items-stretch">
        {loading ? (
          <div>
            <CircularProgress color="success" />
          </div>
        ) : songOfTheDay ? (
          <Song song={songOfTheDay} />
        ) : (
          <div>No song of the day found</div>
        )}
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">{!loading && <TableDailySongs />}</div>
    </section>
  );
}
