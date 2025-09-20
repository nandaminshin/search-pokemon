import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Home() {
    return (
        <div className="text-center flex flex-col items-center justify-center min-h-[40vh] p-4">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-100">
                Welcome to the Pokémon Universe
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-slate-300 max-w-2xl">
                Your ultimate destination to find detailed information about your favorite Pokémon. Start your adventure now!
            </p>
            <Link 
                href="/search" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
                <Search size={20} />
                Start Searching
            </Link>
        </div>
    );
}
