import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";

interface RankingArtistsProps {
  artists: Array<{
    id: string;
    name: string;
    images: Array<{ url: string }>;
    uri: string;
  }>;
}

export default function RankingArtists({ artists }: RankingArtistsProps) {
  const podiumList = artists.slice(0, 3);
  const list = artists.slice(3);

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {podiumList.map((artist) => (
          <Card key={artist.id} isPressable shadow="lg">
            <CardBody className="overflow-visible p-0">
              <Link passHref href={artist.uri}>
                <Image
                  alt={artist.name}
                  className="w-full object-cover h-[20vh]"
                  radius="md"
                  shadow="sm"
                  src={artist.images[0]?.url || "/placeholder-image.jpg"}
                  style={{ cursor: "pointer" }}
                  width="100%"
                />
              </Link>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p className="text-default-500">
                {podiumList.indexOf(artist) + 1}.
              </p>
              <b>{artist.name}</b>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {list.map((artist, index) => (
          <Card key={artist.id} isPressable shadow="sm">
            <CardBody className="overflow-visible p-0">
              <Link passHref href={artist.uri}>
                <Image
                  alt={artist.name}
                  className="w-full object-cover h-[15vh]"
                  radius="lg"
                  shadow="sm"
                  src={artist.images[0]?.url || "/placeholder-image.jpg"}
                  style={{ cursor: "pointer" }}
                  width="100%"
                />
              </Link>
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p className="text-default-500">{index + 4}.</p>
              <b>{artist.name}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
