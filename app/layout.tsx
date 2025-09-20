import './globals.css';
import React from 'react';

export const metadata = {
    title: 'Search Pokemon',
    description: 'Search Pokemon by name using GraphQL',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className="bg-slate-900 text-slate-200 font-sans min-h-screen flex flex-col items-center p-4 sm:p-6">
        <div className="w-full max-w-5xl">
            <header className="mb-8 text-center">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-tight" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                    Pokémon Search
                </h1>
            </header>
            <main className="bg-slate-800/40 p-6 sm:p-8 rounded-xl shadow-2xl backdrop-blur-lg border border-slate-700">
                {children}
            </main>
        </div>
    </body>
        </html>
    );
}