'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchPokemon() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const value = searchParams.get('name') ?? '';
    const [searchValue, setSearchValue] = useState(value);

    useEffect(() => {
        setSearchValue(value);
    }, [value]);

    const submitInput = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchValue.trim();
        if (!trimmed) {
            router.push('/search');
            return;
        }
        router.push(`/search?name=${encodeURIComponent(trimmed)}`);
    }

    return (
        <form onSubmit={submitInput} className="flex gap-2 items-center">
            <input
                aria-label="Search pokemon by name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="e.g. Pikachu"
                className="px-3 py-2 border rounded"
            />
            <button type="submit" className="px-3 py-2 border rounded">Search</button>
        </form>
    );
}