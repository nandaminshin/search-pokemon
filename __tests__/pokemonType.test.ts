import { bulbasaur, charmander, squirtle } from "@/__mocks__/pokemonMocks";

describe("Pokemon type tests", () => {
    it("Bulbasaur should be Grass type", () => {
        expect(bulbasaur.types).toContain("Grass");
    });

    it("Charmander should be Fire type", () => {
        expect(charmander.types).toContain("Fire");
    });

    it("Squirtle should be Water type", () => {
        expect(squirtle.types).toContain("Water");
    });
});
