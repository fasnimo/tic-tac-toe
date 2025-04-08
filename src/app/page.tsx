import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Tic Tac Toe</h1>
      <Link href="/tic-tac-toe" className="text-blue-500 underline">
        Play the Game
      </Link>
    </main>
  );
}
