import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
import { getCategories, getGameById, getReviews } from "./GameManager"

export const GameDetails = () => {
    //have to have this category array here so that i can map over it later
    const [currentGame, setGame] = useState({categories:[], reviews:[]})
    //const [reviews, setReviews] = useState([])

    const { gameId } = useParams()
    const history = useHistory()

    useEffect(()=>{
        getGameById(gameId)
        .then(data=>setGame(data))
    },[])

    // useEffect(()=>{
    //     getReviews()
    //     .then(data => setReviews(data))
    // }, [])



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
                    <li>Categories: {currentGame.categories.map(category => <p>-{category.label}</p>)}</li>  
                </ul>
                <button onClick={()=> history.push(`/games/${currentGame.id}/review`)}>Review Game</button>
            </section>
            <section>
                <h3>Reviews</h3>
                    {currentGame?.reviews.map(review => <p>{review.content}</p>)}
            </section>
        </>
    )
}

// {
//     reviews.map(review => <p>{review.content}</p>)
// }