import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function RankingArtists() {
  const podiumList = [
    {
      title: "Bad Bunny",
      img: "https://i.scdn.co/image/ab67616100005174744a4243fb6cc938011a98f4",
    },
    {
      title: "Capitão Fausto",
      img: "https://i.scdn.co/image/ab67616100005174ed40f4d3ca150a21d32f7734",
    },
    {
      title: "Joey Bada$$",
      img: "https://i.scdn.co/image/ab676161000051745c58c41a506a0d6b32cc6cad",
    },
  ];

  const list = [
    {
      title: "Kanye West",
      img: "https://i.scdn.co/image/ab676161000051746e835a500e791bf9c27a422a",
    },
    {
      title: "Two Door Cinema Club",
      img: "https://i.scdn.co/image/ab6761610000517486faeb97a905a571b2c361a0",
    },
    {
      title: "Drake",
      img: "https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9",
    },
    {
      title: "Travis Scott",
      img: "https://i.scdn.co/image/ab6761610000517419c2790744c792d05570bb71",
    },
    {
      title: "Regula",
      img: "https://i.scdn.co/image/ab6761610000517492b3452441843d89c2d564ce",
    },
    {
      title: "Kendrick Lamar",
      img: "https://i.scdn.co/image/ab67616100005174437b9e2a82505b3d93ff1022",
    },
    {
      title: "MF Doom",
      img: "https://i.scdn.co/image/ab676161000051746c8167ef48a872b6f190078f",
    },
    {
      title: "Men I Trust",
      img: "https://i.scdn.co/image/ab67616100005174fd30ebd7e80dad6b2383aab0",
    },
  ];

  return (
    <div>
      {/* Podium Section */}
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {podiumList.map((item, index) => (
          <Card key={index} isPressable shadow="lg">
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-[20vh]"
                radius="d"
                shadow="sm"
                src={item.img}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p className="text-default-500">{index + 1}.</p>
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Ranking List Section */}
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        {list.map((item, index) => (
          <Card key={index} isPressable shadow="sm">
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-[15vh]"
                radius="lg"
                shadow="sm"
                src={item.img}
                width="100%"
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <p className="text-default-500">{index + 4}.</p>
              <b>{item.title}</b>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
