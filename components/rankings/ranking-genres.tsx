import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

export default function RankingGenres() {
  const podiumList = [
    {
      title: "Bad Bunny",
      img: "https://i.scdn.co/image/ab67616100005174744a4243fb6cc938011a98f4",
      price: "$15.70",
    },
    {
      title: "Capitão Fausto",
      img: "https://i.scdn.co/image/ab67616100005174ed40f4d3ca150a21d32f7734",
      price: "$10.00",
    },
    {
      title: "Joey Bada$$",
      img: "https://i.scdn.co/image/ab676161000051745c58c41a506a0d6b32cc6cad",
      price: "$12.20",
    },
  ];

  const list = [
    {
      title: "Kanye West",
      img: "https://i.scdn.co/image/ab676161000051746e835a500e791bf9c27a422a",
      price: "$5.50",
    },
    {
      title: "Two Door Cinema Club",
      img: "https://i.scdn.co/image/ab6761610000517486faeb97a905a571b2c361a0",
      price: "$3.00",
    },
    {
      title: "Drake",
      img: "https://i.scdn.co/image/ab676161000051744293385d324db8558179afd9",
      price: "$5.30",
    },
    {
      title: "Travis Scott",
      img: "https://i.scdn.co/image/ab6761610000517419c2790744c792d05570bb71",
      price: "$8.00",
    },
    {
      title: "Regula",
      img: "https://i.scdn.co/image/ab6761610000517492b3452441843d89c2d564ce",
      price: "$7.50",
    },
  ];

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {podiumList.map((item, index) => (
          <Card key={index} isPressable shadow="lg">
            <CardBody className="overflow-visible p-0">
              <Image
                alt={item.title}
                className="w-full object-cover h-[140px]"
                radius="lg"
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
                className="w-full object-cover h-[140px]"
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
