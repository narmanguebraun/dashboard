"use client";

import Header from "@/components/Header";

import Weekly from "@/features/Weekly";

import useMediaQuery from "@/hooks/useMediaQuery";

export default function Home() {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <>
      {isDesktop ? (
        <main className="min-h-screen bg-black text-white py-6">
          <div className="max-w-7xl m-auto flex justify-center py-6">
            <Header />
            <Weekly />
          </div>
        </main>
      ) : (
        <main className="min-h-screen bg-black text-white p-6 flex items-center justify-center text-xs">
          <p>This app is available on larger screen.</p>
        </main>
      )}
    </>
  );
}
