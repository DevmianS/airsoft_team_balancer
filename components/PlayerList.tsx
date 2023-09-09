import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// import autoAnimate from '@formkit/auto-animate';

import PlayerType from "../types/playerType";
import AddNewPlayer from "./AddNewPlayer";

import Player from "./Player";

export default function PlayerList() {
  const containerRef = useRef(null);
  const animateListRef = useRef(null);

  const [allPlayers, setAllPlayersArr] = useState<PlayerType[]>([]);
  const [terrorists, setTerrorists] = useState<PlayerType[]>([]);
  const [counterTerrorists, setCounterTerrorists] = useState<PlayerType[]>([]);

  const [playerCount, setPlayerCount] = useState<number>(allPlayers.length + 1);

  const [isRandomized, setIsRandomized] = useState(false);

  const [inputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    if (allPlayers.length !== 0 || !localStorage.getItem("players")) {
      localStorage.setItem("players", JSON.stringify(allPlayers));
    }
    setPlayerCount(allPlayers.length + 1);
  }, [allPlayers]);

  useEffect(() => {
    const localStoragePlayersArr = JSON.parse(
      localStorage.getItem("players") || ""
    );

    setAllPlayersArr(localStoragePlayersArr);
  }, []);

  const addPlayers = (player: PlayerType) => {
    setAllPlayersArr((players) => players.concat(player));
  };

  function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const balancer = () => {
    let allPlayersReduced = allPlayers;
    let terroristsArr = [] as PlayerType[];
    let counterTerroristsArr = [] as PlayerType[];
    const isAllPlayersCountEven = allPlayers.length % 2 === 0;
    const riflemanArr = allPlayersReduced.filter(
      (player) => player.class === "Rifleman"
    );

    const sniperArr = allPlayersReduced.filter(
      (player) => player.class === "Sniper"
    );

    let currentTeam = terroristsArr;
    if (isAllPlayersCountEven) {
      currentTeam =
        randomInteger(1, 2) === 1 ? terroristsArr : counterTerroristsArr;
    }

    while (riflemanArr.length > 0) {
      const randomInt = randomInteger(0, riflemanArr.length - 1);
      currentTeam.push(riflemanArr[randomInt]);
      riflemanArr.splice(randomInt, 1);
      currentTeam =
        currentTeam === terroristsArr ? counterTerroristsArr : terroristsArr;
    }

    while (sniperArr.length > 0) {
      const randomInt = randomInteger(0, sniperArr.length - 1);
      currentTeam.push(sniperArr[randomInt]);
      sniperArr.splice(randomInt, 1);
      currentTeam =
        currentTeam === terroristsArr ? counterTerroristsArr : terroristsArr;
    }

    setTerrorists(terroristsArr);
    setCounterTerrorists(counterTerroristsArr);
    setIsRandomized(true);
  };

  function deleteAllPlayers() {
    setAllPlayersArr([]);
    setIsRandomized(false);
    localStorage.removeItem("players");
  }

  function deletePlayer(playerId: string) {
    setAllPlayersArr((arr) => arr.filter((player) => player.id !== playerId));
    if (allPlayers.length === 0) {
      localStorage.removeItem("players");
    }
  }

  return (
    <div
      ref={containerRef}
      className={`flex flex-col ${allPlayers.length < 1 ? "h-full" : ""}`}
      onClick={(e) => {
        setInputVisible(false);
      }}
    >
      {!isRandomized && (
        <ul
          ref={animateListRef}
          className="w-full h-fit flex flex-col gap-4 items-center py-2"
        >
          {allPlayers.map((player) => (
            <Player
              inputVisible={inputVisible}
              deleteHandler={deletePlayer}
              key={player.id}
              player={player}
            />
          ))}
        </ul>
      )}
      {isRandomized && (
        <div className="flex bg-gradient-to-r from-darkblue to-brown">
          <div className="flex flex-col w-full justify-center gap-2 items-center ">
            <div className={`h-28 w-28 relative rounded-lg mt-2 animate-pop`}>
              <Image
                src={"/icons/counterterrorists.webp"}
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-xs uppercase">Counter-Terrorists</p>
            <ul className="w-full h-full flex flex-col gap-4 items-center">
              {counterTerrorists.map((player) => (
                <Player key={player.id} playerTeam={"CT"} player={player} />
              ))}
            </ul>
          </div>

          <div className="flex flex-col w-full justify-center gap-2 items-center ">
            <div className={`h-28 w-28 relative rounded-lg mt-2 animate-pop`}>
              <Image
                src={"/icons/terrorists.webp"}
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-xs uppercase">Terrorists</p>
            <ul className="w-full h-full flex flex-col gap-4 items-center">
              {terrorists.map((player) => (
                <Player key={player.id} playerTeam={"T"} player={player} />
              ))}
            </ul>
          </div>
        </div>
      )}

      {allPlayers.length !== 0 && (
        <>
          <button
            className={`w-20 bg-sky-600 h-20 flex-col z-10 bottom-3 left-3 rounded-lg flex justify-center transition-all duration-300 items-center fixed  ${
              !isRandomized && allPlayers.length > 1
                ? "animate-bounce"
                : "animate-slideright"
            }`}
            onClick={balancer}
          >
            <p className="text-6xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 active:animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            </p>
            <p className="text-xs">CREATE TEAMS</p>
          </button>
          <div className="w-full flex justify-center mt-4">
            <button
              className={`animate-pop w-20 bg-red-600 h-20 bottom-3 left-3 rounded-lg flex flex-col justify-center gap-1 transition-all duration-300 items-center`}
              onClick={deleteAllPlayers}
            >
              <p className="text-6xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </p>
              <p className="text-xs">DELETE ALL</p>
            </button>
          </div>
        </>
      )}
      <div
        className={`bg-gray-900 flex justify-center fixed bottom-0 w-full transition-all ${
          inputVisible ? "pointer-events-none" : ""
        }`}
      >
        <a href="https://damiansobieraj.com" target="_blank" rel="noreferrer">
          <p>© 2022 Devmian</p>
        </a>
      </div>
      {allPlayers.length === 0 && (
        <div className="w-full h-full flex justify-center items-center">
          <span className="text-4xl text-center">
            Press
            <button
              className={`m-4 text-6xl inline-flex flex-col w-20 h-20 bg-sky-600 rounded-lg justify-center items-center ${
                !inputVisible ? "animate-bounce" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setInputVisible(true);
              }}
            >
              <p className="text-6xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </p>
              <p className="text-xs">ADD NEW</p>
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
          <p className="text-6xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </p>
          <p className="text-xs">PLAYERS</p>
        </button>
      )}
    </div>
  );
}
