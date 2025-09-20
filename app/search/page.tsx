'use client';

import React, { useEffect } from 'react';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApolloProvider } from '@apollo/client/react';
import { useQuery } from '@apollo/client/react';
import client from '@/lib/apolloClient';
import { GET_POKEMON } from '@/graphql/queries';
import SearchPokemon from '@/components/SearchPokemon';
import Result from '@/components/Result';
import { Pokemon, PokemonData, PokemonVars } from '@/type/pokemon';


function SearchContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') ?? '';

    const { data, loading, error } = useQuery<PokemonData, PokemonVars>(GET_POKEMON, {
        variables: { name },
        skip: !name,
        fetchPolicy: 'cache-first',
    });

    if (!name) {
        return <p>Type a name and search.</p>;
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return <Result pokemon={data?.pokemon ?? null} />;
}


export default function Page() {
    return (
        <ApolloProvider client={client}>
            <div className="space-y-4">
                <SearchPokemon />
                <Suspense fallback={<p>Loading...</p>}>
                    <SearchContent />
                </Suspense>
            </div>
        </ApolloProvider>
    );
}