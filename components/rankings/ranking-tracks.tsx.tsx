import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
} from '@nextui-org/react';

import { tracks } from './data';

export default function RankingTracks() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 18;

  const pages = Math.ceil(tracks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tracks.slice(start, end);
  }, [page, tracks]);

  return (
    <div className="flex flex-col gap-3">
      <Table
        removeWrapper
        aria-label="Example table with client-side pagination"
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
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell
                  style={{
                    padding: '12px 16px',
                    whiteSpace: 'nowrap',
                    color: 'inherit',
                  }}
                >
                  {getKeyValue(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
