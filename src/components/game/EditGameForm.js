import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getCategories, getGameById, updateGame } from "./GameManager"

export const EditGame = () => {
    const [game, setGame] = useState({})
    const [cats, setCats] = useState([])

    const {gameId} = useParams()
    const history = useHistory()

    useEffect(()=>{
        getGameById(gameId)
        .then(data => {
            setGame(data)
        })
    },[gameId])

    // useEffect(()=>{
    //     getCategories()
    //     .then(data => setCats(data))
    // },[])

    const editCurrentGame = (evt) => {
        evt.preventDefault()
        const editGameObj = {
            id: game.id,
            title: game.title,
            description: game .description,
            maker: game.maker,
            year_released: game.year_released,
            num_of_players: parseInt(game.num_of_players),
            est_time_to_play_minutes: parseInt(game.est_time_to_play_minutes),
            age_rec: parseInt(game.age_rec),
            gamer: parseInt(localStorage.getItem("token")),
            categories: parseInt(game.categories)
        }
        updateGame(editGameObj).then(()=> history.push(`/games/${gameId}`))
    }

    const updateState =(evt) => {
        const gameCopy = {...game}
        gameCopy[evt.target.name]=evt.target.value
        setGame(gameCopy)
    }
    
    return(
        <>
        <h3>Edit Your Game...</h3>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" required autoFocus className="form-control"
                            value={game.title}
                            onChange={updateState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" required autoFocus className="form-control"
                            value={game.description}
                            onChange={updateState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="maker">Maker: </label>
                        <input type="text" name="maker" required autoFocus className="form-control"
                            value={game.maker}
                            onChange={updateState}
                        />
                    </div>
                </fieldset> 
                <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input id ="year_released" type="number" min="1900" max="2022" name="year_released" required autoFocus className="form-control"
                        value={game.year_released}
                        onChange={updateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number Of Players: </label>
                    <input id ="num_of_players" type="number" min="1" name="num_of_players" required autoFocus className="form-control"
                        value={game.num_of_players}
                        onChange={updateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="est_time_to_play_minutes">Estimated Time to Play in Minutes : </label>
                    <input id ="est_time_to_play_minutes" type="number" min="1" name="est_time_to_play_minutes" required autoFocus className="form-control"
                        value={game.est_time_to_play_minutes}
                        onChange={updateState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_rec">Age Recommendation: </label>
                    <input id ="age_rec" type="number" name="age_rec" min="1" required autoFocus className="form-control"
                        value={game.age_rec}
                        onChange={updateState}
                    />
                </div>
            </fieldset>
            
            <button type ="submit" 
                onClick={editCurrentGame}
                className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

{/* <fieldset>
                <div className="form-group">
                    <label htmlFor="categories">Category: </label>
                    <div className="control">
                        <select name="categories"
                            proptype="int"
                            value={game.categories}
                            onChange={updateState}>
                            <option value="0">Select a Category</option>
                            {cats.map(cat => (
                                <option key = {cat.id} value={cat.id}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset> */}