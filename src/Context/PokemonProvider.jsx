import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../Hook/useForm"

export const PokemonProvider = ({ children }) => {

    const [limit, setLimit] = useState(50)
    const [offset, setOffset] = useState(0)
    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [loading, setLoading] = useState(true)
    const [active, setActive] = useState(false)

    // CustomHook - useForm
    const { valueSearch, onInputChange, onResetForm } = useForm({
        valueSearch: ''
    })

    // Llamar 50 pokemones a la api *************************************************
    const getAllPokemons = async () => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)
        setAllPokemons([...allPokemons, ...results])
        setLoading(false)
    }

    useEffect(() => {
        getAllPokemons()
    }, [offset])


    // Llamar a todos los pokemones a la api ******************************************
    const getGlobalPokemons = async () => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json();

        const promises = data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url)
            const data = await res.json()
            return data
        })

        const results = await Promise.all(promises)
        setAllPokemons(results)
        setLoading(false)
    }

    useEffect(() => {
        getGlobalPokemons()
    }, [])


    // Llamar a un pokemon por ID ******************************************
    const getPokemonsByID = async (id) => {
        const baseURL = 'https://pokeapi.co/api/v2/'
        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
        getPokemonsByID()
    }, [])

    return (
        <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonsByID,

        }}>
            {children}
        </PokemonContext.Provider>
    )
}