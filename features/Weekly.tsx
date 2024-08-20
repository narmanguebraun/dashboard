"use client";

import { useState, useEffect } from "react";
import {
  Dispatch,
  SetStateAction,
  DragEvent,
  FormEvent,
  ChangeEvent,
} from "react";

import { motion } from "framer-motion";

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

function Card({ title, id, column, handleDragStart }: CardProps) {
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

interface DropIndicatorProps {
  beforeId?: string; // Optional; the ID of the item before which the drop indicator should appear
  column: string; // The column the drop indicator is associated with
}

function DropIndicator({ beforeId, column }: DropIndicatorProps) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="w-full bg-gray04 opacity-0"
    />
  );
}

interface Card {
  id: string;
  title: string;
  column: string;
}

interface BurnBarrelProps {
  setCards: Dispatch<SetStateAction<Card[]>>; // Function to update the list of cards
}

function BurnBarrel({ setCards }: BurnBarrelProps) {
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

interface AddCardProps {
  column: string; // The column to which the new card will be added
  setCards: Dispatch<SetStateAction<Card[]>>; // Function to update the list of cards
}

function AddCard({ column, setCards }: AddCardProps) {
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
    <>
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
          className="bg-black flex w-full items-center gap-2 rounded border border-gray06 px-3 py-2 text-gray06 mt-1"
        >
          Add new
        </button>
      )}
    </>
  );
}

interface ColumnProps {
  title: string; // Title of the column
  column: string; // Identifier for the column
  cards: Card[]; // Array of card objects associated with the column
  setCards: React.Dispatch<React.SetStateAction<Card[]>>; // Function to update the list of cards
}

function Column({ title, column, cards, setCards }: ColumnProps) {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent<HTMLDivElement>, card: Card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLElement[]
  ) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = (): HTMLElement[] => {
    return Array.from(
      document.querySelectorAll(`[data-column="${column}"]`)
    ) as HTMLElement[];
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    setActive(false);
    clearHighlights();
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    setActive(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-52 shrink-0 px-0">
      <div className="my-3 flex items-center justify-between">
        <h3>{title}</h3>
        <span className="rounded text-gray04">{filteredCards.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {filteredCards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}

const Board: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]); // Explicitly typing as Card[]

  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards, hasChecked]);

  useEffect(() => {
    const cardData = localStorage.getItem("cards");
    setCards(cardData ? JSON.parse(cardData) : []);
    setHasChecked(true);
  }, []);

  return (
    <div className="flex gap-1 p-6 flex-row overflow-x-scroll text-xs leading-5">
      <Column
        title="Monday"
        column="monday"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Tuesday"
        column="tuesday"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Wednesday"
        column="wednesday"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Thursday"
        column="thursday"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Friday"
        column="friday"
        cards={cards}
        setCards={setCards}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

export default function Weekly() {
  return (
    <div className="max-w-7xl m-auto flex justify-center">
      <div>
        <h1 className="text-center text-sm p-6">Weekly</h1>
        <Board />
      </div>
    </div>
  );
}
