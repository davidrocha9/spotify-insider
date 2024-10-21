'use client';

import { BreadcrumbItem, Breadcrumbs, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { Key, useEffect, useState } from 'react';
import { CircularProgress } from '@nextui-org/progress';

import RankingTracks from '@/components/rankings/ranking-tracks';

export default function App() {
  const [selected, setSelected] = useState<string>('past-4');
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cache, setCache] = useState<Record<string, any[]>>({});

  const fetchTopTracks = async (timeRange: string) => {
    // Use cached data if available
    if (cache[timeRange]) {
      setTopTracks(cache[timeRange]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/ranking/tracks?time_range=${timeRange}`);
      const data = await response.json();

      // Get previous top tracks from localStorage for trend tracking
      const previousTopTracks = JSON.parse(localStorage.getItem('spotify-insider-top-tracks' + timeRange) || '[]');

      // Compare the new tracks to previous ones and calculate trends
      for (const track of data.items) {
        const idx_now = data.items.indexOf(track);
        const track_id = track.id;

        const track_in_previous_top = previousTopTracks.find((t: any) => t.id === track_id);
        const idx_prev = previousTopTracks.indexOf(track_in_previous_top);

        if (idx_prev !== -1) {
          if (idx_now < idx_prev) {
            track.trend = 'up';
          } else if (idx_now > idx_prev) {
            track.trend = 'down';
          } else {
            track.trend = 'same';
          }
        } else {
          track.trend = 'new';
        }
      }

      // Store the new data in localStorage
      localStorage.setItem('spotify-insider-top-tracks' + timeRange, JSON.stringify(data.items));

      // Update state with new tracks and cache them
      setTopTracks(data.items);
      setCache((prevCache) => ({
        ...prevCache,
        [timeRange]: data.items,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching top tracks:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeRangeMap: Record<string, string> = {
      'past-4': 'short_term',
      'past-6': 'medium_term',
      'past-year': 'long_term',
    };

    setIsLoading(true);
    fetchTopTracks(timeRangeMap[selected]);
  }, [selected]);

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto">
      <Breadcrumbs key={'foreground'} color={'foreground'}>
        <BreadcrumbItem>
          <Link href="/rankings">Ranking</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Tracks</BreadcrumbItem>
      </Breadcrumbs>
      <div className="inline-block text-center justify-center mb-10">
        <br />
        <span className="text-white text-4xl">Your top </span>
        <span className="text-green-500 text-4xl font-bold">tracks</span>
        <br />
      </div>
      <Card>
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={(key: Key) => setSelected(key.toString())}
          >
            <Tab key="past-4" title="Past 4 weeks">
              {isLoading ? (
                <div className="w-[40vw] h-[64vh] overflow-y-auto flex items-center justify-center">
                  <CircularProgress color="success" />
                </div>
              ) : (
                <div className="w-[40vw] h-[64vh] overflow-y-auto">
                  <RankingTracks tracks={topTracks} />
                </div>
              )}
            </Tab>
            <Tab key="past-6" title="Past 6 months">
              {isLoading ? (
                <div className="w-[40vw] h-[64vh] overflow-y-auto flex items-center justify-center">
                  <CircularProgress color="success" />
                </div>
              ) : (
                <div className="w-[40vw] h-[64vh] overflow-y-auto">
                  <RankingTracks tracks={topTracks} />
                </div>
              )}
            </Tab>
            <Tab key="past-year" title="Past year">
              {isLoading ? (
                <div className="w-[40vw] h-[64vh] overflow-y-auto flex items-center justify-center">
                  <CircularProgress color="success" />
                </div>
              ) : (
                <div className="w-[40vw] h-[64vh] overflow-y-auto">
                  <RankingTracks tracks={topTracks} />
                </div>
              )}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
