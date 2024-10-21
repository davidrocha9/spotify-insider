"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Image,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/progress";

interface Track {
  track: {
    id: string;
    name: string;
    album: {
      name: string;
      images: { url: string }[];
    };
    artists: { name: string }[];
  };
  played_at: string;
}

export default function TableRecentlyPlayed() {
  const [recentTracks, setRecentTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const rowsPerPage = 12;

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch("/api/recently-played");
        const data = await response.json();

        setRecentTracks(data.items);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching recently played tracks:", error);
        setIsLoading(false);
      }
    };

    fetchRecentlyPlayed();
  }, []);

  const pages = Math.ceil(recentTracks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return recentTracks.slice(start, end).map((item, idx) => ({
      ...item,
      index: start + idx,
    }));
  }, [page, recentTracks]);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }

    return text;
  };

  if (isLoading) {
    return (
      <div className="flex w-full justify-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  return (
    <Table
      aria-label="Recently Played Tracks"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="success"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "h-[930] min-w-[50vw]",
      }}
    >
      <TableHeader>
        <TableColumn key="playedAt">PLAYED AT</TableColumn>
        <TableColumn key="songName">SONG NAME</TableColumn>
        <TableColumn key="artist">ARTIST</TableColumn>
        <TableColumn key="album">ALBUM</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={`${item.track.id}-${item.index}`}>
            <TableCell>{new Date(item.played_at).toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Image
                  alt="NextUI hero Image"
                  radius="sm"
                  src={item.track.album.images[0]?.url}
                  width={50}
                />
                {truncateText(item.track.name, 20)}
              </div>
            </TableCell>
            <TableCell>
              {truncateText(
                item.track.artists.map((artist) => artist.name).join(", "),
                20,
              )}
            </TableCell>
            <TableCell>{truncateText(item.track.album.name, 20)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
