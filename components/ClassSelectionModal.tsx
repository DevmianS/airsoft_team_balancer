import React from "react";
import Image from "next/image";
import PlayerClassType from "../types/playerClassType";
import { CLASS_CONFIG } from "../config/classConfig";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (classType: PlayerClassType) => void;
  currentClass: PlayerClassType;
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
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {Object.values(PlayerClassType).map((classType) => (
            <button
              key={classType}
              className={`flex flex-col items-center p-4 rounded-lg ${
                currentClass === classType ? "bg-sky-600" : "bg-gray-700"
              }`}
              onClick={() => {
                onSelect(classType);
                onClose();
              }}
            >
              <div className="h-28 w-28 relative">
                <Image
                  className="invert"
                  src={CLASS_CONFIG[classType].icon}
                  alt={classType}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span>{classType}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
