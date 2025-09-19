'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ApolloProvider } from '@apollo/client/react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import client from '@/lib/apolloClient';
import { GET_POKEMON } from '@/graphql/queries';
import SearchPokemon from '@/components/SearchPokemon';
import Result from '@/components/Result';
import { Pokemon, PokemonData, PokemonVars } from '@/type/pokemon';


// function SearchContent() {
//     const searchParams = useSearchParams();
//     const name = searchParams.get('name') ?? '';


//     const { data, loading, error } = useQuery(GET_POKEMON, {
//         variables: { name },
//         skip: !name,
//         fetchPolicy: 'cache-first',
//     });


//     useEffect(() => {
//         // optional: prefetch neighboring data or handle side effects
//     }, [name]);


//     if (!name) {
//         return (
//             <div>
//                 <p>Type a name and search.</p>
//             </div>
//         );
//     }


//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>;


//     return <Result pokemon={data?.pokemon ?? null} />;
// }

// type Attack = {
//     name: string;
//     type?: string;
//     damage?: number;
// };

// type Pokemon = {
//     id: string;
//     number?: string;
//     name: string;
//     image?: string;
//     classification?: string;
//     types?: string[];
//     resistant?: string[];
//     weaknesses?: string[];
//     attacks?: { fast?: Attack[]; special?: Attack[] };
//     evolutions?: { id: string; name: string; image?: string }[] | null;
// };

// type PokemonData = {
//     pokemon: Pokemon | null;
// };

// type PokemonVars = {
//     name: string;
// };

function SearchContent() {
    const searchParams = useSearchParams();
    const name = searchParams.get('name') ?? '';

    // 👇 Tell useQuery what to expect
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
                <SearchContent />
            </div>
        </ApolloProvider>
    );
}