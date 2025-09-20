'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PokemonBasic } from '@/type/pokemon';
import client from '@/lib/apolloClient';
import { GET_POKEMON_LIST } from '@/graphql/queries';

export default function SearchPokemon() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const value = searchParams.get('name') ?? '';
    const [searchValue, setSearchValue] = useState(value);
    const [allPokemons, setAllPokemons] = useState<PokemonBasic[]>([]);
    const [suggestions, setSuggestions] = useState<PokemonBasic[]>([]);
    const [isSuggestionVisible, setIsSuggestionVisible] = useState(false);

    useEffect(() => {
        setSearchValue(value);
    }, [value]);

    useEffect(() => {
        client
            .query<{ pokemons: PokemonBasic[] }>({
                query: GET_POKEMON_LIST,
                variables: { first: 151 }, // or higher for more gens
            })
            .then((res) => {
                if (res.data && res.data.pokemons) {
                    setAllPokemons(res.data.pokemons);
                }
            });
    }, []);

    useEffect(() => {
        if (!searchValue.trim()) {
            setSuggestions([]);
            setIsSuggestionVisible(false);
            return;
        }
        const lower = searchValue.toLowerCase();
        const filtered = allPokemons.filter((p) =>
            p.name.toLowerCase().includes(lower)
        );
        setSuggestions(filtered.slice(0, 151));
        if (searchParams.get('name')?.toLowerCase() !== searchValue.toLowerCase()) {
            setIsSuggestionVisible(true);
        }
    }, [searchValue, allPokemons]);


    const submitInput = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = searchValue.trim();
        if (!trimmed) {
            router.push('/search');
            return;
        }
        router.push(`/search?name=${encodeURIComponent(trimmed)}`);
        setIsSuggestionVisible(false);
    }

    return (
        // <form onSubmit={submitInput} className="flex gap-2 items-center">
        //     <input
        //         aria-label="Search pokemon by name"
        //         value={searchValue}
        //         onChange={(e) => setSearchValue(e.target.value)}
        //         placeholder="e.g. Pikachu"
        //         className="px-3 py-2 border rounded"
        //     />
        //     <button type="submit" className="px-3 py-2 border rounded">Search</button>
        // </form>
        <div className="relative w-full max-w-md">
            <form onSubmit={submitInput} className="flex gap-2 items-center">
                <input
                    aria-label="Search pokemon by name"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="e.g. Pikachu"
                    className="px-3 py-2 border rounded w-full"
                />
                <button
                    type="submit"
                    className="px-3 py-2 border rounded bg-orange-600 text-white hover:bg-orange-700"
                >
                    Search
                </button>
            </form>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && isSuggestionVisible && (
                <div
                    className="absolute mt-1 w-full bg-gray-950 border rounded shadow z-10 
               max-h-64 overflow-y-auto"
                >
                    {suggestions.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => {
                                router.push(`/search?name=${encodeURIComponent(p.name)}`);
                                setIsSuggestionVisible(false);
                            }
                            }
                            className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-slate-900"
                        >
                            <img src={p.image} alt={p.name} className="w-8 h-8" />
                            <span>{p.name}</span>
                        </button>
                    ))}
                </div>
            )
            }
        </div >
    );
}