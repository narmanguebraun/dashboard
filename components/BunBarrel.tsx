"use client";

import { Dispatch, DragEvent, SetStateAction, useState } from "react";

import { Card } from "@/types";

interface BurnBarrelProps {
  setCards: Dispatch<SetStateAction<Card[]>>; // Function to update the list of cards
}

export default function BurnBarrel({ setCards }: BurnBarrelProps) {
  const [active, setActive] = useState(true);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    const cardId = e.dataTransfer.getData("cardId");
    console.log(cardId);

    setCards((prevCards) => prevCards.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div className="w-52 shrink-0 px-0">
      <div className="my-3 flex items-center justify-between">
        <h3 className={`text-pink`}>Delete</h3>
      </div>

      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`rounded border px-3 py-2 ${
          active
            ? "border-pink bg-pink/20 text-pink"
            : "border-gray06 text-gray06"
        }`}
      >
        {active ? "Fire" : "Trash"}
      </div>
    </div>
  );
}
