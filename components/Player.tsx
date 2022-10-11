import React, { useRef, useState } from 'react';
import Image from 'next/image';
import PlayerType from '../types/playerType';

interface Props {
  player: PlayerType;
  playerTeam?: 'T' | 'CT';
  deleteHandler?: (playerId: string) => void;
}

export default function Player({ player, playerTeam, deleteHandler }: Props) {
  const playerRef = useRef<HTMLLIElement>(null);
  const [readyToDelete, setReadyToDelete] = useState(false);

  function playerHandler() {
    if (!playerTeam) {
      setReadyToDelete(state => !state);
    }
  }

  function getPlayerClass(playerTeam = 'CT') {
    if (player.class === 'Rifleman' && playerTeam === 'T')
      return '/icons/ak47.webp';
    if (player.class === 'Rifleman') return '/icons/m4.webp';
    if (player.class === 'Sniper') return '/icons/sniper.webp';
    else return '';
  }

  return (
    <li
      ref={playerRef}
      data-playerid={player.id}
      onClick={playerHandler}
      className={`bg-gray-700 w-11/12 rounded-lg px-6 flex justify-between items-center shadow-md relative animate-slidedown ${
        playerTeam === 'T' ? 'flex-col bg-sand p-2 gap-1 px-1' : ''
      } ${playerTeam === 'CT' ? 'flex-col bg-lightblue p-2 gap-1 px-1' : ''}`}
    >
      <p
        className={`text-2xl text-ellipsis overflow-hidden max-w-[40vw] h-8 ${
          playerTeam === 'T' ? 'bg-brown w-full text-center rounded-lg' : ''
        }${
          playerTeam === 'CT' ? 'bg-darkblue w-full text-center rounded-lg' : ''
        }  `}
      >
        {player.name.toUpperCase()}
      </p>
      <div
        className={`h-28 w-28 relative rounded-lg ${
          playerTeam === 'CT' ? 'bg-grayblue h-28 w-36' : ''
        } ${playerTeam === 'T' ? 'bg-lightbrown h-28 w-36' : ''}`}
      >
        <Image
          className='invert'
          src={getPlayerClass(playerTeam)}
          alt='logo'
          layout='fill'
          objectFit='contain'
        />
      </div>
      {readyToDelete && (
        <button
          onClick={e => {
            if (playerRef.current?.dataset.playerid && deleteHandler) {
              deleteHandler(playerRef.current?.dataset.playerid);
            }
          }}
          className='absolute right-4 top-0 gap-1 bottom-0 w-20 h-20 bg-red-600 rounded-lg my-auto flex flex-col justify-center transition-all duration-300 items-center'
        >
          <p className='text-6xl'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-12 h-12'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </p>
          <p className='text-xs'>DELETE</p>
        </button>
      )}
    </li>
  );
}
