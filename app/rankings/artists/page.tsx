'use client';

import { BreadcrumbItem, Breadcrumbs, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@nextui-org/progress';

import RankingArtists from '@/components/rankings/ranking-artists';

export default function App() {
  const [selected, setSelected] = useState('past-4');
  const [topArtists, setTopArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cache, setCache] = useState({});

  const fetchTopArtists = async (timeRange) => {
    if (cache[timeRange]) {
      setTopArtists(cache[timeRange]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/ranking/artists?time_range=${timeRange}`);
      const data = await response.json();

      setTopArtists(data.items);
      setCache((prevCache) => ({
        ...prevCache,
        [timeRange]: data.items,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching top artists:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeRangeMap = {
      'past-4': 'short_term',
      'past-6': 'medium_term',
      'past-year': 'long_term',
    };
    fetchTopArtists(timeRangeMap[selected]);
  }, [selected]);

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto">
      <Breadcrumbs key={'foreground'} color={'foreground'}>
        <BreadcrumbItem>
          <Link href="/rankings">Ranking</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Artists</BreadcrumbItem>
      </Breadcrumbs>
      <div className="inline-block text-center justify-center mb-10">
        <br />
        <span className="text-white text-4xl">Your top </span>
        <span className="text-green-500 text-4xl font-bold">artists</span>
        <br />
      </div>
      <Card className="">
        <CardBody className="overflow-hidden">
          <Tabs fullWidth aria-label="Tabs form" selectedKey={selected} size="md" onSelectionChange={setSelected}>
            <Tab key="past-4" title="Past 4 weeks">
              {isLoading ? (
                <div className="w-[40vw] h-[62vh] overflow-y-auto flex items-center justify-center">
                  {' '}
                  <CircularProgress color="success" />
                </div>
              ) : (
                <div className="w-[40vw] h-[62vh] overflow-y-auto">
                  <RankingArtists artists={topArtists} />
                </div>
              )}
            </Tab>
            <Tab key="past-6" title="Past 6 months">
              {isLoading ? (
                <div className="w-[40vw] h-[62vh] overflow-y-auto flex items-center justify-center">
                  {' '}
                  <CircularProgress color="success" />
                </div>
              ) : (
                <div className="w-[40vw] h-[62vh] overflow-y-auto">
                  <RankingArtists artists={topArtists} />
                </div>
              )}
            </Tab>
            <Tab key="past-year" title="Past year">
              {isLoading ? (
                <div className="w-[40vw] h-[62vh] overflow-y-auto flex items-center justify-center">
                  {' '}
                  <CircularProgress color="success" />
                </div>
              ) : (
                <div className="w-[40vw] h-[62vh] overflow-y-auto">
                  <RankingArtists artists={topArtists} />
                </div>
              )}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
