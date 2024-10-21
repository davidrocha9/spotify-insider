import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from '@nextui-org/react';

export default function TableDailySongs() {
  const [page, setPage] = React.useState(1);
  const [tracks, setTracks] = React.useState([]);
  const rowsPerPage = 18;

  // Fetch data from local storage when the component mounts
  React.useEffect(() => {
    const storedSongs = JSON.parse(localStorage.getItem('songsOfTheDay')) || {};
    const songsArray = Object.entries(storedSongs).map(([date, song]) => ({
      date,
      songName: song.name,
      artist: song.artists?.map((artist) => artist.name).join(', '),
      album: song.album?.name,
    }));
    setTracks(songsArray);
  }, []);

  const pages = Math.ceil(tracks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return tracks.slice(start, end);
  }, [page, tracks]);

  return (
    <Table
      aria-label="Daily Songs Table with Pagination"
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
        wrapper: 'h-[930px] min-w-[50vw]',
      }}
    >
      <TableHeader>
        <TableColumn key="date">DATE</TableColumn>
        <TableColumn key="songName">SONG NAME</TableColumn>
        <TableColumn key="artist">ARTIST</TableColumn>
        <TableColumn key="album">ALBUM</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.date}>
            {(columnKey) => (
              <TableCell
                style={{
                  padding: '12px 16px',
                  whiteSpace: 'nowrap',
                }}
              >
                {getKeyValue(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
