"use client";

import Link from "next/link";
import {
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  MusicalNoteIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { User } from "@nextui-org/react";

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <nav className={`${className} flex flex-col h-screen`}>
      <ul className="flex-grow flex flex-col justify-center items-center space-y-6 overflow-y-auto">
        <li className="w-full">
          <Link
            className="block w-full text-center py-4 hover:bg-gray-700 hover:text-green-500 transition-colors"
            href="/"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <HomeIcon className="w-14 h-14 mr-2" />
              <span className="text-lg font-medium">Home</span>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            className="block w-full text-center py-4 hover:bg-gray-700 hover:text-green-500 transition-colors"
            href="/song-of-the-day"
          >
            <div className="flex flex-col items-center justify-center">
              <MusicalNoteIcon className="w-14 h-14 mr-2" />
              <span className="text-lg font-medium">Song of the Day</span>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            className="block w-full text-center py-4 hover:bg-gray-700 hover:text-green-500 transition-colors"
            href="/rankings"
          >
            <div className="flex flex-col items-center justify-center">
              <TrophyIcon className="w-14 h-14 mr-2" />
              <span className="text-lg font-medium">Rankings</span>
            </div>
          </Link>
        </li>
        <li className="w-full">
          <Link
            className="block w-full text-center py-4 hover:bg-gray-700 hover:text-green-500 transition-colors"
            href="/recently-played"
          >
            <div className="flex flex-col items-center justify-center">
              <ArrowPathIcon className="w-14 h-14 mr-2" />
              <span className="text-lg font-medium">Recently Played</span>
            </div>
          </Link>
        </li>
      </ul>
      <div className="w-full mt-auto pb-4 px-4 flex items-center justify-between">
        <User
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/58984118?v=4",
          }}
          description="Hip-hop enthusiast"
          name="David Rocha"
        />
        <ArrowRightOnRectangleIcon className="w-8 h-8 text-red-500" />
      </div>
    </nav>
  );
};
