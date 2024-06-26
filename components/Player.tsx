import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PlayerType from "../types/playerType";

interface Props {
  player: PlayerType;
  playerTeam?: "T" | "CT";
  deleteHandler?: (playerId: string) => void;
  togglePlayerClass?: (playerId: string) => void;
  inputVisible?: boolean;
}

export default function Player({
  player,
  playerTeam,
  deleteHandler,
  togglePlayerClass,
  inputVisible,
}: Props) {
  const playerRef = useRef<HTMLLIElement>(null);
  const [showModifyButtons, setShowModifyButtons] = useState(false);

  function playerHandler() {
    if (!playerTeam && !inputVisible) {
      setShowModifyButtons((state) => !state);
    }
  }

  function getPlayerClass(playerTeam = "CT") {
    if (player.class === "Rifleman" && playerTeam === "T")
      return "/icons/ak47.webp";
    if (player.class === "Rifleman") return "/icons/m4.webp";
    if (player.class === "Sniper") return "/icons/sniper.webp";
    else return "";
  }

  return (
    <li
      ref={playerRef}
      data-playerid={player.id}
      onClick={playerHandler}
      className={`bg-gray-700 w-11/12 rounded-lg px-6 flex justify-between items-center shadow-md relative animate-slidedown ${
        playerTeam === "T"
          ? "flex-col bg-gradient-to-b from-sand to-lightbrown p-2 gap-1 px-1"
          : ""
      } ${
        playerTeam === "CT"
          ? "flex-col bg-gradient-to-b from-lightblue to-lighterblue p-2 gap-1 px-1"
          : ""
      }`}
    >
      <p
        className={`text-2xl text-ellipsis overflow-hidden max-w-[40vw] h-8 ${
          playerTeam === "T"
            ? "bg-gradient-to-t from-brown to-lightbrown w-full text-center rounded-lg"
            : ""
        }${
          playerTeam === "CT"
            ? "bg-gradient-to-t from-darkblue to-lighterblue w-full text-center rounded-lg"
            : ""
        }  `}
      >
        {player.name.toUpperCase()}
      </p>
      <div
        className={`h-28 w-28 relative rounded-lg ${
          playerTeam === "CT"
            ? "bg-gradient-to-t from-darkblue to-lighterblue h-28 w-36"
            : ""
        } ${
          playerTeam === "T"
            ? "bg-gradient-to-t from-brown to-lightbrown  h-28 w-36"
            : ""
        }`}
      >
        <Image
          className="invert"
          src={getPlayerClass(playerTeam)}
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {showModifyButtons && (
        <button
          onClick={() => {
            if (playerRef.current?.dataset.playerid && togglePlayerClass) {
              togglePlayerClass(playerRef.current?.dataset.playerid);
            }
          }}
          className="absolute right-28 top-0 gap-1 bottom-0 w-20 h-20 bg-red-600 rounded-lg my-auto flex flex-col justify-center transition-all duration-300 items-center animate-pop"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="AutorenewIcon"
            stroke="transparent"
            fill="currentColor"
          >
            <path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6m6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26"></path>
          </svg>
          CLASS
        </button>
      )}
      {showModifyButtons && (
        <button
          onClick={() => {
            if (playerRef.current?.dataset.playerid && deleteHandler) {
              deleteHandler(playerRef.current?.dataset.playerid);
            }
          }}
          className="absolute right-4 top-0 gap-1 bottom-0 w-20 h-20 bg-red-600 rounded-lg my-auto flex flex-col justify-center transition-all duration-300 items-center animate-pop"
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
          <p className="text-xs">DELETE</p>
        </button>
      )}
    </li>
  );
}
