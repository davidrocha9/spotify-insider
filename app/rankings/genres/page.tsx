"use client";

import { BreadcrumbItem, Breadcrumbs, Progress } from "@nextui-org/react";
import Link from "next/link";

export default function App() {
  // Sample genres with their progress values that sum up to 100%
  const genres = [
    { name: "Hip Hop", percentage: 80 },
    { name: "Pop", percentage: 75 },
    { name: "Rock", percentage: 60 },
    { name: "Jazz", percentage: 50 },
    { name: "Electronic", percentage: 70 },
    { name: "R&B", percentage: 65 },
    { name: "Reggae", percentage: 55 },
    { name: "Country", percentage: 45 },
    { name: "Classical", percentage: 30 },
    { name: "Metal", percentage: 40 },
  ];

  // Sort genres by percentage in descending order
  const sortedGenres = genres.sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="flex flex-col w-full" style={{ width: "1000px" }}>
      <Breadcrumbs key={"foreground"} color={"foreground"}>
        <BreadcrumbItem>
          <Link href="/rankings">Ranking</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Genres</BreadcrumbItem>
      </Breadcrumbs>
      <div className="inline-block text-center justify-center mb-10">
        <br />
        <span className="text-white text-4xl">Your top </span>
        <span className="text-green-500 text-4xl font-bold">genres</span>
        <br />
      </div>
      <div className="flex flex-row">
        {/* Column for Genres and Progress Bars */}
        <div className="flex flex-col w-full">
          {sortedGenres.map((genre, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <span className="text-white text-left w-1/4">{genre.name}</span>
              <div className="w-3/4">
                <Progress color="success" size="lg" value={genre.percentage}>
                  {genre.percentage}%
                </Progress>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
