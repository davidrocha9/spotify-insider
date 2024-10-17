"use client";

import React from "react";

import TableRecentlyPlayed from "@/components/recently-played/recently-played-table";

export default function RecentlyPlayed() {
  return (
    <section className="flex flex-col items-center justify-center flex-grow h-full gap-6">
      <div className="flex flex-row gap-2 whitespace-nowrap">
        <span className="text-white text-4xl">Your</span>
        <span className="text-green-500 text-4xl font-bold">
          recently played
        </span>
        <span className="text-white text-4xl">tracks</span>
      </div>

      <TableRecentlyPlayed />
    </section>
  );
}
