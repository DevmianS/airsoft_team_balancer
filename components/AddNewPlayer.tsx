import React, { useRef, useState } from "react";
import Image from "next/image";
import PlayerClassType from "../types/playerClassType";
import PlayerType from "../types/playerType";
import { v4 as uuidv4 } from "uuid";
import { CLASS_CONFIG } from "../config/classConfig";

interface Props {
  addPlayers: (player: PlayerType) => void;
  allPlayers: PlayerType[];
  playerCount: {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
  };
  inputControl: {
    inputVisible: boolean;
    setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function AddNewPlayer({
  addPlayers,
  inputControl,
  allPlayers,
  playerCount,
}: Props) {
  const { inputVisible, setInputVisible } = inputControl;
  const [selectedClass, setSelectedClass] = useState<PlayerClassType>(
    PlayerClassType.Rifleman
  );
  const nameInputRef = useRef<HTMLInputElement>(null);

  const addPlayerButtonHandler = () => {
    let newPlayer = {
      id: uuidv4(),
      class: selectedClass,
    } as unknown as PlayerType;
    if (nameInputRef.current) {
      newPlayer.name =
        nameInputRef.current.value || `Player ${playerCount.count}`;
      addPlayers(newPlayer);
      setInputVisible(false);
      playerCount.setCount((cur) => cur + 1);
    }
  };

  return (
    <form
      className={`bg-gray-800 min-h-[5rem] bottom-3 right-3 animate-slideleft ${
        inputVisible ? "left-3" : ""
      } rounded-lg flex justify-between items-stretch transition-all duration-300 fixed z-20`}
    >
      {inputVisible && (
        <div
          className="flex flex-col justify-between h-full w-4/5 p-4"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl self-start">CLASS:</span>
            <div className="flex justify-evenly w-full flex-wrap gap-2">
              {Object.values(PlayerClassType).map((classType) => (
                <label
                  key={classType}
                  htmlFor={classType}
                  className="h-w-28 h-20 w-28 relative"
                >
                  <input
                    name="type"
                    id={classType}
                    type="radio"
                    defaultChecked={selectedClass === classType}
                    onChange={(e) => {
                      setSelectedClass(e.currentTarget.id as PlayerClassType);
                    }}
                  />
                  <Image
                    className="invert"
                    src={CLASS_CONFIG[classType].icon}
                    alt={classType}
                    layout="fill"
                    objectFit="cover"
                  />
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-2xl self-start">NAME:</span>
            <input
              className="bg-gray-400 rounded-lg h-16 w-full p-2 font-normal text-3xl text-gray-900"
              type="text"
              ref={nameInputRef}
            />
          </div>
        </div>
      )}
      <button
        className={`w-20 bg-sky-600 flex justify-center flex-col items-center self-stretch ${
          inputVisible ? "rounded-r-lg" : "rounded-lg"
        }`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setInputVisible(true);
          addPlayerButtonHandler();
        }}
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </p>
        <p className="text-xs">ADD NEW</p>
      </button>
    </form>
  );
}
