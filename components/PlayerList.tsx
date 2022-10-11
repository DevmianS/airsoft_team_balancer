import React, { Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import PlayerType from '../types/playerType';
import AddNewPlayer from './AddNewPlayer';

import Player from './Player';

export default function PlayerList() {
  const containerRef = useRef(null);

  const [allPlayers, setAllPlayersArr] = useState<PlayerType[]>([]);
  const [terrorists, setTerrorists] = useState<PlayerType[]>([]);
  const [counterTerrorists, setCounterTerrorists] = useState<PlayerType[]>([]);

  const [playerCount, setPlayerCount] = useState<number>(allPlayers.length + 1);

  const [isRandomized, setIsRandomized] = useState(false);

  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    if (allPlayers.length !== 0 || !localStorage.getItem('players')) {
      localStorage.setItem('players', JSON.stringify(allPlayers));
    }
    console.log(allPlayers);
    setPlayerCount(allPlayers.length + 1);
  }, [allPlayers]);

  useEffect(() => {
    const localStoragePlayersArr = JSON.parse(
      localStorage.getItem('players') || ''
    );

    setAllPlayersArr(localStoragePlayersArr);
  }, []);

  const addPlayers = (player: PlayerType) => {
    setAllPlayersArr(players => players.concat(player));
  };

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const balancer = () => {
    let allPlayersReduced = allPlayers;
    let terroristsArr = [];
    let counterTerroristsArr = [];
    let teamSelector = false;

    while (allPlayersReduced.length !== 0) {
      const randomNmb = randomInteger(0, allPlayersReduced.length - 1);
      const drawnPlayer = allPlayersReduced[randomNmb];
      const riflemanCount = allPlayersReduced.filter(
        player => player.class === 'Rifleman'
      ).length;

      if (
        drawnPlayer.class === 'Sniper' &&
        allPlayersReduced.some(player => player.class === 'Rifleman')
      ) {
        if (
          riflemanCount >= 2 ||
          (allPlayersReduced.length === 2 &&
            terroristsArr.length > counterTerroristsArr.length)
        ) {
          continue;
        }
      }

      allPlayersReduced = allPlayersReduced.filter(
        player => player !== drawnPlayer
      );

      if (teamSelector) {
        counterTerroristsArr.push(drawnPlayer);
        teamSelector = !teamSelector;
      } else {
        terroristsArr.push(drawnPlayer);
        teamSelector = !teamSelector;
      }
    }

    setTerrorists(terroristsArr);
    setCounterTerrorists(counterTerroristsArr);
    setIsRandomized(true);
  };

  function deleteAllPlayers() {
    setAllPlayersArr([]);
    setIsRandomized(false);
    localStorage.removeItem('players');
  }

  function deletePlayer(playerId: string) {
    setAllPlayersArr(arr => arr.filter(player => player.id !== playerId));
    if (allPlayers.length === 0) {
      console.log(allPlayers);
      localStorage.removeItem('players');
    }
  }

  return (
    <div
      ref={containerRef}
      className='flex flex-col h-full'
      onClick={e => {
        setInputVisible(false);
      }}
    >
      <div
        className={`bg-gray-900 flex justify-center fixed bottom-0 w-full transition-all ${
          inputVisible ? 'pointer-events-none' : ''
        }`}
      >
        <a href='https://damiansobieraj.com' target='_blank' rel='noreferrer'>
          <p>© 2022 Devmian</p>
        </a>
      </div>

      {!isRandomized && (
        <ul className='w-full h-fit flex flex-col gap-4 items-center py-2'>
          {allPlayers.map(player => (
            <Player
              deleteHandler={deletePlayer}
              key={player.id}
              player={player}
            />
          ))}
        </ul>
      )}
      {isRandomized && (
        <div className='flex'>
          <div className='flex flex-col w-full justify-center gap-2 items-center bg-darkblue '>
            <div className={`h-28 w-28 relative rounded-lg mt-2`}>
              <Image
                src={'/icons/counterterrorists.png'}
                alt='logo'
                layout='fill'
                objectFit='contain'
              />
            </div>
            <p className='text-xs uppercase'>Counter-Terrorists</p>
            <ul className='w-full h-full flex flex-col gap-4 items-center'>
              {counterTerrorists.map(player => (
                <Player key={player.id} playerTeam={'CT'} player={player} />
              ))}
            </ul>
          </div>

          <div className='flex flex-col w-full justify-center gap-2 items-center bg-lightbrown'>
            <div className={`h-28 w-28 relative rounded-lg mt-2`}>
              <Image
                src={'/icons/terrorists.png'}
                alt='logo'
                layout='fill'
                objectFit='contain'
              />
            </div>
            <p className='text-xs uppercase'>Terrorists</p>
            <ul className='w-full h-full flex flex-col gap-4 items-center'>
              {terrorists.map(player => (
                <Player key={player.id} playerTeam={'T'} player={player} />
              ))}
            </ul>
          </div>
        </div>
      )}
      {allPlayers.length !== 0 && (
        <>
          <button
            className={`w-20 bg-sky-600 h-20 flex-col  ${
              !isRandomized && allPlayers.length > 1 ? 'animate-bounce' : ''
            } bottom-3 left-3 rounded-lg flex justify-center transition-all duration-300 items-center fixed animate-slideright`}
            onClick={balancer}
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
                  d='M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3'
                />
              </svg>
            </p>
            <p className='text-xs'>CREATE TEAMS</p>
          </button>
          <div className='w-full flex justify-center mt-4'>
            <button
              className={` animate-slidedown w-20 bg-red-600 h-20 bottom-3 left-3 rounded-lg flex flex-col justify-center gap-1 transition-all duration-300 items-center`}
              onClick={deleteAllPlayers}
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
              <p className='text-xs'>DELETE ALL</p>
            </button>
          </div>
        </>
      )}
      {allPlayers.length === 0 && (
        <div className='w-full h-full flex justify-center items-center'>
          <span className='text-4xl text-center'>
            Press
            <button
              className={`m-4 text-6xl inline-flex flex-col w-20 h-20 bg-sky-600 rounded-lg justify-center items-center ${
                !inputVisible ? 'animate-bounce' : ''
              }`}
              onClick={e => {
                e.stopPropagation();
                setInputVisible(true);
              }}
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
                    d='M12 4.5v15m7.5-7.5h-15'
                  />
                </svg>
              </p>
              <p className='text-xs'>ADD NEW</p>
            </button>
            <br />
            to add new players
          </span>
        </div>
      )}
      {!isRandomized && (
        <AddNewPlayer
          playerCount={{ count: playerCount, setCount: setPlayerCount }}
          inputControl={{ inputVisible, setInputVisible }}
          addPlayers={addPlayers}
          allPlayers={allPlayers}
        />
      )}
      {isRandomized && (
        <button
          className={`animate-slideleft w-20 bg-sky-600 h-20 flex-col  bottom-3 right-3 rounded-lg flex justify-center items-center fixed`}
          onClick={() => {
            setIsRandomized(false);
          }}
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
                d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
              />
            </svg>
          </p>
          <p className='text-xs'>PLAYERS</p>
        </button>
      )}
    </div>
  );
}
