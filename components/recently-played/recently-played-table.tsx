import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";

import { tracks } from "./data";

export default function TableRecentlyPlayed() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 18;

  const pages = Math.ceil(tracks.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return tracks.slice(start, end);
  }, [page, tracks]);

  return (
    <Table
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
        wrapper: "h-[930] min-w-[50vw]",
      }}
    >
      <TableHeader>
        <TableColumn key="songName">SONG NAME</TableColumn>
        <TableColumn key="artist">ARTIST</TableColumn>
        <TableColumn key="album">ALBUM</TableColumn>
        <TableColumn key="timestamp">PLAYED AT</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell
                style={{
                  padding: "12px 16px",
                  whiteSpace: "nowrap",
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
