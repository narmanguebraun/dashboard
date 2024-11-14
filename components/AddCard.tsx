"use client";

import { useState } from "react";
import { Dispatch, SetStateAction, FormEvent, ChangeEvent } from "react";

import { motion } from "framer-motion";
import { Card } from "@/types";

interface AddCardProps {
  column: Card["column"]; // The column to which the new card will be added
  setCards: Dispatch<SetStateAction<Card[]>>; // Function to update the list of cards
}

export default function AddCard({ column, setCards }: AddCardProps) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: Card = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((prevCards) => [...prevCards, newCard]);

    setText(""); // Clear the input after adding
    setAdding(false); // Close the form after submission
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div className="mt-1">
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={handleTextChange}
            onClick={() => setAdding(false)}
            autoFocus
            placeholder="What's the plan?"
            className="w-full rounded border border-gray04 bg-dark px-3 py-2 text-gray01 placeholder-gray04 focus:outline-0"
          />
          <div className="mt-2 flex items-center justify-end gap-2">
            <motion.button
              onClick={() => setAdding(false)}
              className="px-3 py-1 text-gray04 transition-colors hover:text-gray01"
            >
              Close
            </motion.button>
            <motion.button
              type="submit"
              className="px-3 py-1 text-gray04 transition-colors hover:text-gray01"
            >
              Add
            </motion.button>
          </div>
        </motion.form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-2 rounded border border-gray06 bg-black px-3 py-2 text-gray06"
        >
          Add new
        </button>
      )}
    </div>
  );
}
