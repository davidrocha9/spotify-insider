import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image } from '@nextui-org/react';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from '@heroicons/react/24/outline';

interface Artist {
  name: string;
}

interface Album {
  name: string;
  images: { url: string }[];
}

interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  trend?: string; // 'up', 'down', 'same', 'new'
}

interface RankingTracksProps {
  tracks: Track[];
}

export default function RankingTracks({ tracks }: RankingTracksProps) {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const renderTrendIcon = (trend: string | undefined) => {
    switch (trend) {
      case 'up':
        return <ArrowUpIcon className="w-4 text-green-500" />;
      case 'down':
        return <ArrowDownIcon className="w-4 text-red-500" />;
      case 'new':
        return <ArrowUpIcon className="w-4 text-blue-500" />;
      case 'same':
        return <MinusIcon className="w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <Table isStriped removeWrapper aria-label="Top Tracks Ranking">
      <TableHeader>
        <TableColumn>RANKING</TableColumn>
        <TableColumn>SONG NAME</TableColumn>
        <TableColumn>ARTIST</TableColumn>
        <TableColumn>ALBUM</TableColumn>
      </TableHeader>
      <TableBody>
        {tracks.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                {index + 1}
                {renderTrendIcon(item.trend)}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Image alt={item.album.name} radius="sm" src={item.album.images[0]?.url} width={50} />
                {truncateText(item.name, 30)}
              </div>
            </TableCell>
            <TableCell>{truncateText(item.artists.map((artist) => artist.name).join(', '), 30)}</TableCell>
            <TableCell>{truncateText(item.album.name, 30)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
