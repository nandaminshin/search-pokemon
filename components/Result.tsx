'use client';

import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Pokemon, PokemonData, PokemonVars } from '@/type/pokemon';
import client from '@/lib/apolloClient';
import { GET_POKEMON } from '@/graphql/queries';

export default function Result({ pokemon }: { pokemon: Pokemon | null }) {
    const router = useRouter();

    const viewEvolution = (name: string) => {
        client.query({
            query: GET_POKEMON,
            variables: { name },
        });
        router.push(`/search?name=${encodeURIComponent(name)}`);
    };

    if (!pokemon) {
        return (
            <div className="p-4 border rounded">
                <h3 className="text-lg font-semibold">Not found</h3>
                <p>No Pokémon matched that name.</p>
            </div>
        );
    }

    return (
        <div className="p-4 border rounded space-y-4">
            <div className="flex gap-4 items-center">
                {pokemon.image && <img src={pokemon.image} alt={pokemon.name} width={120} height={120} />}
                <div>
                    <h2 className="text-2xl font-bold">{pokemon.name} <span className="text-sm text-gray-500">#{pokemon.number}</span></h2>
                    <p>{pokemon.classification}</p>
                    {pokemon.types && <p>Types: {pokemon.types.join(', ')}</p>}
                    <p>Max Weight: {pokemon.weight?.maximum}</p>
                    <p>Mim Weight: {pokemon.weight?.minimum}</p>
                    <p>Max Height: {pokemon.height?.maximum}</p>
                    <p>Mim Height: {pokemon.height?.minimum}</p>
                    <p>Flee Rate: {pokemon.fleeRate}</p>
                    <p>Max CP: {pokemon.maxCP}</p>
                    <p>Max HP: {pokemon.maxHP}</p>
                </div>
            </div>


            <div>
                <h4 className="font-semibold">Attacks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <strong>Fast</strong>
                        <ul>
                            {(pokemon.attacks?.fast ?? []).map((a) => (
                                <li key={a.name}>{a.name} {a.damage ? `- ${a.damage}` : ''}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <strong>Special</strong>
                        <ul>
                            {(pokemon.attacks?.special ?? []).map((a) => (
                                <li key={a.name}>{a.name} {a.damage ? `- ${a.damage}` : ''}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>


            <div>
                <h4 className="font-semibold">Evolutions</h4>
                <div className="flex gap-4">
                    {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                        pokemon.evolutions.map((e) => (
                            <button
                                key={e.id}
                                onClick={() => viewEvolution(e.name)}
                                className="flex flex-col items-center p-2 border rounded"
                            >
                                {e.image && <img src={e.image} alt={e.name} width={80} height={80} />}
                                <span>{e.name}</span>
                            </button>
                        ))
                    ) : (
                        <p>None</p>
                    )}
                </div>
            </div>
        </div>
    );
}