import Link from "next/link";
import { GitHubIcon, TwitterIcon } from "@/components/Icons";

export default function Header() {
  return (
    <header className="fixed bottom-16 z-10 flex w-full items-center justify-center text-center">
      <div className="flex items-center gap-4 rounded-full border border-white px-6 py-3 text-sm">
        <h1>Dashboard</h1> |
        <Link href="https://github.com/narmanguebraun">
          <GitHubIcon />
        </Link>
        <Link href="https://x.com/narmanguebraun">
          <TwitterIcon />
        </Link>
      </div>
    </header>
  );
}
