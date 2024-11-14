import { Card } from "@/types";

interface DropIndicatorProps {
  beforeId?: string; // Optional; the ID of the item before which the drop indicator should appear
  column: Card["column"]; // The column the drop indicator is associated with
}

export default function DropIndicator({
  beforeId,
  column,
}: DropIndicatorProps) {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="w-full bg-gray04 opacity-0"
    />
  );
}
