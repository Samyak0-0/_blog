"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            href="/daily-snippets"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Daily Snippets
          </Link>
        </div>

        <Link href="/" className="text-2xl font-bold text-gray-900">
          MyLife
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/pic-of-day"
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Pic of the Day
          </Link>
        </div>
      </div>
    </nav>
  );
}
