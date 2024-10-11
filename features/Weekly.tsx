import Board from "@/components/Board";

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
