"use client";

import { Card, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";

export default function App() {
  return (
    <div>
      <div className="inline-block text-center justify-center mb-20">
        <span className="text-white text-4xl">Select which </span>
        <span className="text-green-500 text-4xl font-bold">ranking</span>
        <span className="text-white text-4xl"> you want to see</span>
        <br />
      </div>
      <section className="flex flex-row items-stretch justify-center flex-grow h-full gap-10 max-w-[50vw] gap-4 grid grid-cols-12">
        <Link className="col-span-12 sm:col-span-4" href="/rankings/artists">
          <Card isPressable className="h-[50vh]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                The ones you listen to the most
              </p>
              <h4 className="text-white font-medium text-large">Top Artists</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </Card>
        </Link>
        <Link className="col-span-12 sm:col-span-4" href="/rankings/tracks">
          <Card isPressable className="h-[50vh]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-black/60 uppercase font-bold">
                The tunes you can&apos;t live without
              </p>
              <h4 className="text-black font-medium text-large">Top Tracks</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://images.pexels.com/photos/6827400/pexels-photo-6827400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </Card>
        </Link>
        <Link className="col-span-12 sm:col-span-4" href="/rankings/genres">
          <Card isPressable className="h-[50vh]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">
                The moods you most feel
              </p>
              <h4 className="text-white font-medium text-large">Top Genres</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://images.pexels.com/photos/1943411/pexels-photo-1943411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            />
          </Card>
        </Link>
      </section>
    </div>
  );
}
