import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getCategories, getGameById } from "./GameManager"

export const GameDetails = () => {
    const [currentGame, setGame] = useState({})
    //const [categories, setCats] = useState([])
    const { gameId } = useParams()

    useEffect(()=>{
        getGameById(gameId)
        .then(data=>setGame(data))
    },[])

    // useEffect(()=>{
    //     getCategories()
    //     .then(data=>setCats(data))
    // },[])


    return(
        <>
            <h1>Game Details...</h1>
            <section>
                <h3>{currentGame.title}</h3>
                <ul>
                <li>Made By {currentGame.maker}</li>
                <li>Released in {currentGame.year_released}</li>
                <li>Number of Players: {currentGame.num_of_players}</li>
                <li>Estimated time in play in minutes: {currentGame.est_time_to_play_minutes}</li>
                <li>Age Recommendation: {currentGame.age_rec}+</li>
                <li>Categories:{
                    currentGame?.categories.map((currentGame.category) => {{currentGame.category.label}})
                    } </li>
                    
                </ul>
            </section>
        </>
    )
}