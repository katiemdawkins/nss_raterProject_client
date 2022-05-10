import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { HomePage } from "./Home.js"
import{ GameDetails } from "./game/GameDetails.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <HomePage />
            </Route> 
            <Route exact path="/games">
                <GameList />
            </Route> 
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails />
            </Route> 
        </main>
    </>
}
