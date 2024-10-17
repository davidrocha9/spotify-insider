"use client";

import {
  BreadcrumbItem,
  Breadcrumbs,
  Card,
  CardBody,
  Tab,
  Tabs,
} from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

import RankingArtists from "@/components/rankings/ranking-artists";

export default function App() {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex flex-col w-full" style={{ width: "1000px" }}>
      <Breadcrumbs key={"foreground"} color={"foreground"}>
        <BreadcrumbItem>
          <Link href="/rankings">Ranking</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Artists</BreadcrumbItem>
      </Breadcrumbs>
      <div className="inline-block text-center justify-center mb-10">
        <br />
        <span className="text-white text-4xl">Your top </span>
        <span className="text-green-500 text-4xl font-bold">artists</span>
        <br />
      </div>
      <Card className="">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={setSelected}
          >
            <Tab key="past-4" title="Past 4 weeks">
              <RankingArtists />
            </Tab>
            <Tab key="past-6" title="Past 6 months">
              <RankingArtists />
            </Tab>
            <Tab key="past-year" title="Past year">
              <RankingArtists />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
