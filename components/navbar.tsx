'use client';

import Link from 'next/link';
import {
  ArrowPathIcon,
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  MusicalNoteIcon,
  TrophyIcon,
} from '@heroicons/react/24/outline';
import { Button, User, CircularProgress } from '@nextui-org/react';
import { useState, useEffect } from 'react';

export const Navbar = ({ className }: { className?: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/status');
        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch (error) {
        console.error('Failed to check auth status:', error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleSpotifyLogin = async () => {
    try {
      window.location.href = '/api/auth/login';
    } catch (error) {
      console.error('Failed to initiate login:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
            onClick={(e) => handleLinkClick(e, '/')}
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
            onClick={(e) => handleLinkClick(e, '/song-of-the-day')}
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
            onClick={(e) => handleLinkClick(e, '/rankings')}
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
            onClick={(e) => handleLinkClick(e, '/recently-played')}
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
            <CircularProgress />
          </div>
        ) : isAuthenticated ? (
          <>
            <User
              avatarProps={{
                src: 'https://avatars.githubusercontent.com/u/58984118?v=4',
              }}
              description="Hip-hop enthusiast"
              name="David Rocha"
            />
            <Button isIconOnly onClick={handleLogout} className="p-2">
              <ArrowRightEndOnRectangleIcon className="w-8 h-8 text-red-500 cursor-pointer" />
            </Button>
          </>
        ) : (
          <Button
            auto
            color="success"
            onClick={handleSpotifyLogin}
            className="w-full flex items-center justify-center gap-2"
          >
            Login with Spotify
          </Button>
        )}
      </div>
    </nav>
  );
};
