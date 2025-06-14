import React from "react";
import Image from "next/image";
import PlayerType from "../types/playerType";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (classType: "Rifleman" | "Sniper") => void;
  currentClass: PlayerType["class"];
}

export default function ClassSelectionModal({
  isOpen,
  onClose,
  onSelect,
  currentClass,
}: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl text-center mb-4">Select Class</h2>
        <div className="flex gap-4">
          <button
            className={`flex flex-col items-center p-4 rounded-lg ${
              currentClass === "Rifleman" ? "bg-sky-600" : "bg-gray-700"
            }`}
            onClick={() => {
              onSelect("Rifleman");
              onClose();
            }}
          >
            <div className="h-28 w-28 relative">
              <Image
                className="invert"
                src="/icons/m4.webp"
                alt="Rifleman"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span>Rifleman</span>
          </button>
          <button
            className={`flex flex-col items-center p-4 rounded-lg ${
              currentClass === "Sniper" ? "bg-sky-600" : "bg-gray-700"
            }`}
            onClick={() => {
              onSelect("Sniper");
              onClose();
            }}
          >
            <div className="h-28 w-28 relative">
              <Image
                className="invert"
                src="/icons/sniper.webp"
                alt="Sniper"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span>Sniper</span>
          </button>
        </div>
      </div>
    </div>
  );
}
