import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
    query getPokemons($name: String!){
        pokemon(name: $name){
            id
            number
            name
            weight{
                minimum
                maximum
            }
            height{
                minimum
                maximum
            }
            attacks {
                fast {
                    name
                    type
                    damage
                }
                special {
                    name
                    type
                    damage
                }
            }
            evolutions {
                id
                number
                name
                image
            }
            classification
            types
            resistant
            weaknesses
            fleeRate
            maxCP
            maxHP
            image
        }
    }
`;