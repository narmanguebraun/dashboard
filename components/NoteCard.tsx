"use client";

import { DragEvent } from "react";

import DropIndicator from "./DropIndicator";
import { motion } from "framer-motion";
import { Card } from "@/types";

interface CardProps {
  column: Card["column"];
  id: Card["id"];
  title: Card["title"];
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: Card) => void;
}

export default function NoteCard({
  column,
  id,
  title,
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
        className="mt-1 cursor-grab rounded border border-gray05 bg-gray06 px-3 py-2 active:cursor-grabbing"
      >
        <div className="text-gray02">{title}</div>
      </motion.div>
    </>
  );
}
