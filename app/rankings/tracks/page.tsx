"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Link from "next/link";
import { Key, useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/progress";

import RankingTracks from "@/components/rankings/ranking-tracks";

export default function App() {
  const [selected, setSelected] = useState<string>("past-4");
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cache, setCache] = useState<Record<string, any[]>>({});

  const fetchTopTracks = async (timeRange: string) => {
    if (cache[timeRange]) {
      setTopTracks(cache[timeRange]);
      setIsLoading(false);

      return;
    }

    try {
      const response = await fetch(
        `/api/ranking/tracks?time_range=${timeRange}`,
      );
      const data = await response.json();

      setTopTracks(data.items);
      setCache((prevCache) => ({
        ...prevCache,
        [timeRange]: data.items,
      }));

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching top tracks:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeRangeMap: Record<string, string> = {
      "past-4": "short_term",
      "past-6": "medium_term",
      "past-year": "long_term",
    };

    fetchTopTracks(timeRangeMap[selected]);
  }, [selected]);

  return (
    <div className="flex flex-col w-full max-w-screen-xl mx-auto">
      <Breadcrumbs key={"foreground"} color={"foreground"}>
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
