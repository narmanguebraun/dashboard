"use client";

import { useEffect, useState } from "react";
import Column from "./Column";
import BurnBarrel from "./BunBarrel";
import { Card } from "@/types";

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

export default Board;
