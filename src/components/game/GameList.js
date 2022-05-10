import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {  getGames } from "./GameManager.js"

export const GameList = (props) => {
    const [ games, setGames ] = useState([])


    const gamesState = () =>{
        getGames().then(data => setGames(data))
    }

    useEffect(()=>{
        gamesState()
    },[])


    
    return (
        <article className="games">
            <h2>Games...</h2>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title"><Link className ="gameLink" to={`/games/${game.id}`}>{game.title}</Link></div>
                    </section>

                })
            }
        </article>
    )
}