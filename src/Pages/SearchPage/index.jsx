// Import React
import { useLocation } from "react-router-dom"
import { useContext } from "react"

// Import Components
import { PokemonContext } from "../../Context/PokemonContext"
import { CardPokemon } from "../../Components/CardPokemon"

export const SearchPage = () => {
	const location = useLocation();

	const { globalPokemons } = useContext(PokemonContext);

	const filteredPokemons = globalPokemons.filter(pokemon =>
		pokemon.name.includes(location.state.toLowerCase())
	);

    console.log(filteredPokemons)

    return (
        <div className="container">
            <p className="p-search">
                Se encontraron <span>{filteredPokemons.length}</span> resultados:
            </p>
            <div className="card-list-pokemon container">
                {filteredPokemons.map(pokemon => (
                    <CardPokemon pokemon={pokemon} key={pokemon.id} />
                ))}
            </div>
        </div>
    )

}