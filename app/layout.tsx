import './globals.css';
import React from 'react';


export const metadata = {
    title: 'Search Pokemon',
    description: 'Search Pokemon by name using GraphQL',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="p-6">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-orange-700">Search Pokémon</h1>
                </header>
                <main>{children}</main>
            </body>
        </html>
    );
}