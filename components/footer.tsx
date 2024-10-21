'use client';

import { Link } from '@nextui-org/link';

import { HeartFilledIcon } from './icons';

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center py-3 bg-[transparent] text-white bottom-0 left-0">
      <Link
        isExternal
        className="flex items-center gap-1 text-current"
        href="https://github.com/davidrocha9"
        title="nextui.org homepage"
      >
        <span className="text-default-600 flex items-center">
          Made with <HeartFilledIcon className="text-red-500 mx-1" /> by David Rocha
        </span>
      </Link>
    </footer>
  );
};
