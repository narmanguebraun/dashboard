import { DragEvent } from "react";

export interface Card {
  id: string;
  title: string;
  column: string;
}

export interface CardProps {
  title: string;
  id: string;
  column: string;
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: Card) => void;
}

export interface DropIndicatorProps {
  beforeId?: string;
  column: string;
}

export interface BurnBarrelProps {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export interface AddCardProps {
  column: string;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

export interface ColumnProps {
  title: string;
  column: string;
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}
