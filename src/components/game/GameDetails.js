import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router"
import { createRating, getCategories, getGameById, getReviews } from "./GameManager"

export const GameDetails = () => {
    //have to have this category array here so that i can map over it later
    const { gameId } = useParams()

    const [gameRating, setRating] = useState({
        game: gameId,
        gamer: 0,
        rating: 0
    })
    const [currentGame, setGame] = useState({categories:[], reviews:[], average_rating:0})

    const history = useHistory()

    useEffect(()=>{
        getGameById(gameId)
        .then(data=>setGame(data))
    },[])

    const changeRatingState = (evt) => {
        const newRating = Object.assign({}, gameRating)
        newRating[evt.target.name] = evt.target.value
        setRating(newRating)
    }
    

    return(
        <>
            <h1>Game Details...</h1>
            <section>
                <h3>{currentGame.title}</h3>
                <ul>
                    <li>Description: {currentGame.description}</li>
                    <li>Made By: {currentGame.maker}</li>
                    <li>Released in: {currentGame.year_released}</li>
                    <li>Number of Players: {currentGame.num_of_players}</li>
                    <li>Estimated time in play in minutes: {currentGame.est_time_to_play_minutes}</li>
                    <li>Age Recommendation: {currentGame.age_rec}+</li>
                    <li>Categories: {currentGame.categories.map(category => <p>-{category.label}</p>)}</li>  
                </ul>
                {
                    currentGame.gamer === localStorage.getItem("token") ?
                    <button onClick={()=> history.push(`/games/${currentGame.id}/edit`)}>Edit Game</button>
                    :
                    ""
                }
                <button onClick={()=> history.push(`/games/${currentGame.id}/review`)}>Review Game</button>
                <button onClick={()=> history.push(`/games/${currentGame.id}/edit`)}>Edit Game</button>
            </section>
            <section>
                <h3>Rate This Game</h3>
                <form>
                    <fieldset>
                    <div className="form-group">
                        <label htmlFor="rating">1 = AWFUL... 10 = Best Game Ever! </label>
                        <input id ="rating" type="number" min="1" max="10" name="rating" required autoFocus className="form-control"
                            value={gameRating.rating}
                            onChange={changeRatingState}
                        />
                    </div>
                    <button type="submit"
                        onClick={evt=>{
                            
                            const gameRatingObj = {
                                game: parseInt(gameRating.game),
                                gamer: parseInt(localStorage.getItem("token")),
                                rating: parseInt(gameRating.rating)
                            }

                            createRating(gameRatingObj)
                            .then(()=>history.push(`/games/${gameId}`))
                        }}>Submit Your Rating</button>
                </fieldset>
            </form>
            </section>
            <section>
                <h3>Average Rating: {currentGame.average_rating}</h3>  
            </section>
            <section>
                <h3>Reviews</h3>
                    {currentGame?.reviews.map(review => <p>{review.content}</p>)}
            </section>
        </>
    )
}

// const canEdit = () => {
    //     if (currentGame.gamer === localStorage.getItem("token")){
    //     return <button onClick={()=> history.push(`/games/${currentGame.id}/edit`)}>Edit Game</button>
    // }}