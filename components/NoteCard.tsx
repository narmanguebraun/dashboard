"use client";

import { DragEvent } from "react";

import DropIndicator from "./DropIndicator";

import { motion } from "framer-motion";
import { Card } from "@/types";

interface CardProps {
  title: string; // The title of the card
  id: string; // The unique identifier for the card
  column: string; // The column the card belongs to
  handleDragStart: (
    e: DragEvent<HTMLDivElement>,
    card: { title: string; id: string; column: string }
  ) => void; // The function that handles the drag start event
}

const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Card) => {
  e.dataTransfer.setData("cardId", card.id);
};

export default function NoteCard({
  title,
  id,
  column,
  handleDragStart,
}: CardProps) {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e as unknown as React.DragEvent<HTMLDivElement>, {
            title,
            id,
            column,
          })
        }
        className="cursor-grab rounded border border-gray05 bg-gray06 px-3 py-2 active:cursor-grabbing mt-1"
      >
        <div className="text-gray02">{title}</div>
      </motion.div>
    </>
  );
}
