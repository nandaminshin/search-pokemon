// app/search/page.tsx
import client from "@/lib/apolloClient";
import { GET_POKEMON } from "@/graphql/queries";
import Result from "@/components/Result";
import SearchPokemon from "@/components/SearchPokemon";
import { PokemonData, PokemonVars } from "@/type/pokemon";

export default async function Page(props: {
    searchParams: Promise<{ name?: string }>;
}) {
    const { name = "" } = await props.searchParams;
    if (!name) {
        return (
            <div className="space-y-4">
                <SearchPokemon />
                <p>Type a name and search.</p>
            </div>
        );
    }

    try {
        const { data } = await client.query<PokemonData, PokemonVars>({
            query: GET_POKEMON,
            variables: { name },
            fetchPolicy: "cache-first"
        });

        return (
            <div className="space-y-4">
                <SearchPokemon />
                <Result pokemon={data?.pokemon ?? null} />
            </div>
        );
    } catch (error: any) {
        return (
            <div className="space-y-4">
                <SearchPokemon />
                <p className="text-red-500">Error: {error.message}</p>
            </div>
        );
    }
}
