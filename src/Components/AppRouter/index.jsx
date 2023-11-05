// Import React
import { Navigate, Route, Routes } from "react-router-dom"

// Import Pages
import { PokemonPage } from "../../Pages/PokemonPage"
import { HomePage } from "../../Pages/HomePage"
import { SearchPage } from "../../Pages/SearchPage"

// Import Components
import { Navigation } from "../Navigation"

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Navigation />}>
                <Route index element={<HomePage />} />
                <Route path='pokemon/:id' element={<PokemonPage />} />
                <Route path='search' element={<SearchPage />} />
            </Route>
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )

}