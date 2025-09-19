export type Attack = {
    name: string;
    type?: string;
    damage?: number;
};

export type Pokemon = {
    id: string;
    number?: string;
    name: string;
    image?: string;
    weight?: Weight;
    classification?: string;
    types?: string[];
    resistant?: string[];
    weaknesses?: string[];
    attacks?: { fast?: Attack[]; special?: Attack[] };
    evolutions?: { id: string; name: string; image?: string }[] | null;
    height?: Height;
    fleeRate?: number;
    maxCP?: number;
    maxHP?: number;
};

export type Weight = {
    minimum: string;
    maximum: string;
};

export type Height = {
    minimum: string;
    maximum: string;
};


export type PokemonData = {
    pokemon: Pokemon | null;
};

export type PokemonVars = {
    name: string;
};
