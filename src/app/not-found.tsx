import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-8xl text-blue-800 font-bold">404</h1>
      <p className="text-4xl text-blue-800">Page not Found</p>
      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 text-white bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </main>
  );
}
