import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Image } from '@nextui-org/react';

export default function RankingTracks({ tracks }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 11;

  const pages = Math.ceil(tracks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tracks.slice(start, end).map((item, index) => ({
      ...item,
      index: start + index,
    }));
  }, [page, tracks]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="flex flex-col gap-3">
      <Table
        removeWrapper
        aria-label="Top Tracks Ranking"
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
          wrapper: 'h-[930]',
        }}
      >
        <TableHeader>
          <TableColumn key="ranking">RANKING</TableColumn>
          <TableColumn key="songName">SONG NAME</TableColumn>
          <TableColumn key="artist">ARTIST</TableColumn>
          <TableColumn key="album">ALBUM</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.index + 1}</TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Image
                    src={item.album.images[0]?.url}
                    alt={item.album.name}
                    width={50}
                    objectFit="cover"
                    radius="sm"
                  />
                  {truncateText(item.name, 30)}
                </div>
              </TableCell>

              <TableCell>{truncateText(item.artists.map((artist) => artist.name).join(', '), 30)}</TableCell>

              <TableCell>{truncateText(item.album.name, 30)}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
