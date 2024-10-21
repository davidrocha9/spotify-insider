import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Image } from '@nextui-org/react';

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
}

interface RankingTracksProps {
  tracks: Track[];
}

export default function RankingTracks({ tracks }: RankingTracksProps) {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Table removeWrapper isStriped aria-label="Top Tracks Ranking">
      <TableHeader>
        <TableColumn>RANKING</TableColumn>
        <TableColumn>SONG NAME</TableColumn>
        <TableColumn>ARTIST</TableColumn>
        <TableColumn>ALBUM</TableColumn>
      </TableHeader>
      <TableBody>
        {tracks.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <Image src={item.album.images[0]?.url} alt={item.album.name} width={50} radius="sm" />
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
