import Header from "@/components/Header";
import Weekly from "@/features/Weekly";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <Weekly />
    </main>
  );
}
