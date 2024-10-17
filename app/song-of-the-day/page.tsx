"use client";

import React from "react";

import { Song } from "@/components/song-of-the-day/song";
import TableDailySongs from "@/components/song-of-the-day/table-daily-song";

export default function SongOfTheDayPage() {
  return (
    <section className="flex flex-row items-stretch justify-center flex-grow h-full gap-10">
      <div className="flex items-stretch">
        <Song />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <TableDailySongs />
      </div>
    </section>
  );
}
