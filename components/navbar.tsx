"use client";

import Link from "next/link";
import {
  ArrowPathIcon,
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  MusicalNoteIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { Button, User, CircularProgress } from "@nextui-org/react";
import { useState, useEffect } from "react";

export const Navbar = ({ className }: { className?: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/status");
        const data = await response.json();

        setIsAuthenticated(data.isAuthenticated);

        if (data.isAuthenticated) {
          fetchUserInfo();
        }
      } catch (error) {
        // Optional: Use a logging library or remove this statement
        console.error("Failed to check auth status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("/api/user/");

      if (response.ok) {
        const userData = await response.json();

        setUserInfo(userData);
      } else {
        // Optional: Use a logging library or remove this statement
        console.error("Failed to fetch user info");
      }
    } catch (error) {
      // Optional: Use a logging library or remove this statement
      console.error("Error fetching user info:", error);
    }
  };

  const handleSpotifyLogin = async () => {
    try {
      window.location.href = "/api/auth/login";
    } catch (error) {
      // Optional: Use a logging library or remove this statement
      console.error("Failed to initiate login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
      setUserInfo(null);
    } catch (error) {
      // Optional: Use a logging library or remove this statement
      console.error("Failed to logout:", error);
    }
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      event.preventDefault();
      handleSpotifyLogin();
    }
  };

  return (
    <nav className={`${className} flex flex-col h-screen`}>
      <ul className="flex-grow flex flex-col justify-center items-center space-y-6 overflow-y-auto">
        <li className="w-full">
          <Link
            className="block w-full text-center py-4 hover:bg-gray-700 hover:text-green-500 transition-colors"
            href="/"
            onClick={handleLinkClick}
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
            onClick={handleLinkClick}
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
            onClick={handleLinkClick}
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
            onClick={handleLinkClick}
          >
            <div className="flex flex-col items-center justify-center">
              <ArrowPathIcon className="w-14 h-14 mr-2" />
              <span className="text-lg font-medium">Recently Played</span>
            </div>
          </Link>
        </li>
      </ul>
      <div className="w-full mt-auto pb-4 px-4 flex items-center justify-between">
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <CircularProgress color="success" size="lg" />
          </div>
        ) : isAuthenticated && !loading ? (
          <>
            {userInfo ? (
              <User
                avatarProps={{
                  src: userInfo.profileImage,
                }}
                description={userInfo.description || "Music lover"}
                name={userInfo.displayName || "User"}
              />
            ) : (
              <CircularProgress color="success" size="lg" />
            )}
            <Button isIconOnly className="p-2" onClick={handleLogout}>
              <ArrowRightEndOnRectangleIcon className="w-8 h-8 text-red-500 cursor-pointer" />
            </Button>
          </>
        ) : (
          <Button
            className="w-full flex items-center justify-center gap-2"
            color="success"
            onClick={handleSpotifyLogin}
          >
            Login with Spotify
          </Button>
        )}
      </div>
    </nav>
  );
};
