'use client';

import { Card, CardHeader, CardBody, Image } from '@nextui-org/react';

interface Artist {
  name: string;
}

interface Album {
  name: string;
  images: { url: string }[];
}

interface SongProps {
  className?: string;
  song: {
    name: string;
    artists: Artist[];
    album: Album;
  };
}

export const Song: React.FC<SongProps> = ({ className, song }) => {
  return (
    <section className={`flex flex-col items-center justify-center flex-grow h-full ${className}`}>
      <Image isBlurred isZoomed alt={`${song.name} album cover`} src={song.album.images[0].url} width={500} />

      <div className="flex flex-row items-center justify-between w-[20vw] p-4">
        <div className="flex flex-col text-left w-full">
          <span className="text-white text-3xl font-bold">{song.name}</span>
          <span className="text-default-500 text-xl">{song.artists[0].name}</span>
        </div>

        <div className="ml-4">
          <svg height="50" viewBox="0 0 50 50" width="50" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
            <path
              d="M25.009,1.982C12.322,1.982,2,12.304,2,24.991S12.322,48,25.009,48s23.009-10.321,23.009-23.009S37.696,1.982,25.009,1.982z M34.748,35.333c-0.289,0.434-0.765,0.668-1.25,0.668c-0.286,0-0.575-0.081-0.831-0.252C30.194,34.1,26,33,22.5,33.001 c-3.714,0.002-6.498,0.914-6.526,0.923c-0.784,0.266-1.635-0.162-1.897-0.948s0.163-1.636,0.949-1.897 c0.132-0.044,3.279-1.075,7.474-1.077C26,30,30.868,30.944,34.332,33.253C35.022,33.713,35.208,34.644,34.748,35.333z M37.74,29.193 c-0.325,0.522-0.886,0.809-1.459,0.809c-0.31,0-0.624-0.083-0.906-0.26c-4.484-2.794-9.092-3.385-13.062-3.35 c-4.482,0.04-8.066,0.895-8.127,0.913c-0.907,0.258-1.861-0.272-2.12-1.183c-0.259-0.913,0.272-1.862,1.184-2.12 c0.277-0.079,3.854-0.959,8.751-1c4.465-0.037,10.029,0.61,15.191,3.826C37.995,27.328,38.242,28.388,37.74,29.193z M40.725,22.013 C40.352,22.647,39.684,23,38.998,23c-0.344,0-0.692-0.089-1.011-0.275c-5.226-3.068-11.58-3.719-15.99-3.725 c-0.021,0-0.042,0-0.063,0c-5.333,0-9.44,0.938-9.481,0.948c-1.078,0.247-2.151-0.419-2.401-1.495 c-0.25-1.075,0.417-2.149,1.492-2.4C11.729,16.01,16.117,15,21.934,15c0.023,0,0.046,0,0.069,0 c4.905,0.007,12.011,0.753,18.01,4.275C40.965,19.835,41.284,21.061,40.725,22.013z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </div>

      <br />

      <Card>
        <CardHeader className="flex gap-3 text-2xl font-bold p-5">
          <span>What is this?</span>
        </CardHeader>
        <CardBody className="pb-10 pl-10 pr-10">
          <span>
            &quot;Song of the Day&quot; highlights a track that represents your current musical journey. Whether
            it&apos;s your most listened-to song or a recent discovery that resonates with you, this feature reflects
            your evolving taste and connection to music. Each day, we celebrate the tracks that define your listening
            habits, allowing you to revisit favorites and explore new sounds that have captured your attention.
            It&apos;s a personal snapshot of your musical landscape, showcasing what you love right now.
          </span>
        </CardBody>
      </Card>
    </section>
  );
};
