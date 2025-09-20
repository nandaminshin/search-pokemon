'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Pokemon } from '@/type/pokemon';
import client from '@/lib/apolloClient';
import { GET_POKEMON } from '@/graphql/queries';
import { Flame, Shield, Zap, ArrowRight } from 'lucide-react';
import { typeIcons } from './PokemonTypeIcons';

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
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-800">Not found</h3>
                <p className="text-slate-600">No Pokémon matched that name.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Top info */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {pokemon.image && (
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        width={160}
                        height={160}
                        className="rounded-lg border border-slate-100 shadow-md"
                    />
                )}
                <div className="space-y-2">
                    <h2 className="text-3xl font-extrabold text-orange-700">
                        {pokemon.name}
                        <span className="ml-2 text-sm font-normal text-slate-500">
                            #{pokemon.number}
                        </span>
                    </h2>
                    <p className="text-slate-600">{pokemon.classification}</p>

                    {/* Types */}
                    {pokemon.types && (
                        <div className="flex gap-2 items-center flex-wrap">
                            <span className="font-normal text-slate-600">Types:</span>
                            {pokemon.types.map((t) => (
                                <span key={t} className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                                    {typeIcons[t]}
                                    <span>{t}</span>
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm text-slate-700">
                        <p>⚖️ Max Wt: {pokemon.weight?.maximum}</p>
                        <p>⚖️ Min Wt: {pokemon.weight?.minimum}</p>
                        <p>📏 Max Ht: {pokemon.height?.maximum}</p>
                        <p>📏 Min Ht: {pokemon.height?.minimum}</p>
                        <p>🏃‍♂️ Flee Rate: {pokemon.fleeRate}</p>
                        <p>🔥 Max CP: {pokemon.maxCP}</p>
                        <p>❤️ Max HP: {pokemon.maxHP}</p>
                    </div>

                    {pokemon.resistant && (
                        <p className="text-sm text-green-700">
                            <Shield className="mr-1 inline h-4 w-4" /> Resistant: {pokemon.resistant.join(', ')}
                        </p>
                    )}

                    {pokemon.weaknesses && (
                        <p className="text-sm text-red-700">
                            <Flame className="mr-1 inline h-4 w-4" /> Weaknesses: {pokemon.weaknesses.join(', ')}
                        </p>
                    )}
                </div>
            </div>

            {/* Attacks */}
            <div>
                <h4 className="mb-2 text-lg font-semibold text-slate-800">Attacks</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 shadow-sm">
                        <strong className="block mb-1 text-amber-500">Fast</strong>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                            {(pokemon.attacks?.fast ?? []).map((a) => (
                                <li key={a.name}>
                                    {a.name} {a.damage ? `- ${a.damage}` : ''}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 shadow-sm">
                        <strong className="block mb-1 text-amber-500">Special</strong>
                        <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                            {(pokemon.attacks?.special ?? []).map((a) => (
                                <li key={a.name}>
                                    {a.name} {a.damage ? `- ${a.damage}` : ''}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Evolutions */}
            <div>
                <h4 className="mb-2 text-lg font-semibold text-slate-800">Evolutions</h4>
                <div className="flex flex-wrap gap-4">
                    {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                        pokemon.evolutions.map((e) => (
                            <button
                                key={e.id}
                                onClick={() => viewEvolution(e.name)}
                                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:bg-orange-50 transition"
                            >
                                {e.image && (
                                    <img
                                        src={e.image}
                                        alt={e.name}
                                        width={96}
                                        height={96}
                                        className="mb-1 rounded-lg border border-slate-100"
                                    />
                                )}
                                <span className="text-sm font-medium text-slate-800 flex items-center gap-1">
                                    {e.name}
                                    <ArrowRight className="h-3 w-3" />
                                </span>
                            </button>
                        ))
                    ) : (
                        <p className="text-slate-600">None</p>
                    )}
                </div>
            </div>
        </div>
    );
}
