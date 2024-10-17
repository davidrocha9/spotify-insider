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

import RankingTracks from "@/components/rankings/ranking-tracks.tsx";

export default function App() {
  const [selected, setSelected] = useState("");

  return (
    <div className="flex flex-col w-full" style={{ width: "1000px" }}>
      <Breadcrumbs key={"foreground"} color={"foreground"}>
        <BreadcrumbItem>
          <Link href="/rankings">Ranking</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Tracks</BreadcrumbItem>
      </Breadcrumbs>
      <div className="inline-block text-center justify-center mb-10">
        <br />
        <span className="text-white text-4xl">Your top </span>
        <span className="text-green-500 text-4xl font-bold">tracks</span>
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
              <RankingTracks />
            </Tab>
            <Tab key="past-6" title="Past 6 months">
              <RankingTracks />
            </Tab>
            <Tab key="past-year" title="Past year">
              <RankingTracks />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
