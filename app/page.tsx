import React from 'react';
import Link from 'next/link';


export default function Home() {
    return (
        <div className="space-y-4">
            <p>Welcome! Search for your favorite Pokémon.</p>
            <Link href="/search">Go to search</Link>
        </div>
    );
}