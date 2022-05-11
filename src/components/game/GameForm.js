import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getCategories, createGame } from "./GameManager"

export const GameForm = () => {
    const [categories, setCats]= useState([])
    
    const [currentGame, setCurrentGame] =useState({
        title: "",
        description:"",
        maker: "",
        year_released: 2000,
        num_of_players: 0,
        est_time_to_play_minutes: 0,
        age_rec: 0,
        gamer: 0,
        categories: []
    })
    
    const history = useHistory()

    useEffect(()=>{
        getCategories()
        .then(data=>setCats(data))
    },[])

    const changeGameState = (evt) => {
        const newGame = Object.assign({}, currentGame)
        newGame[evt.target.name]= evt.target.value
        setCurrentGame(newGame)
    }
    
    return(
        <>
        <h3>Register New Game</h3>
            <form>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title: </label>
                        <input type="text" name="title" required autoFocus className="form-control"
                            value={currentGame.title}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description: </label>
                        <input type="text" name="description" required autoFocus className="form-control"
                            value={currentGame.description}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="maker">Maker: </label>
                        <input type="text" name="maker" required autoFocus className="form-control"
                            value={currentGame.maker}
                            onChange={changeGameState}
                        />
                    </div>
                </fieldset> 
                <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input id ="year_released" type="number" min="1900" max="2022" name="year_released" required autoFocus className="form-control"
                        value={currentGame.year_released}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="num_of_players">Number Of Players: </label>
                    <input id ="num_of_players" type="number" min="1" name="num_of_players" required autoFocus className="form-control"
                        value={currentGame.num_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="est_time_to_play_minutes">Estimated Time to Play in Minutes : </label>
                    <input id ="est_time_to_play_minutes" type="number" min="1" name="est_time_to_play_minutes" required autoFocus className="form-control"
                        value={currentGame.est_time_to_play_minutes}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_rec">Age Recommendation: </label>
                    <input id ="age_rec" type="number" name="age_rec" min="1" required autoFocus className="form-control"
                        value={currentGame.age_rec}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="categories">Category: </label>
                    <div className="control">
                        <select name="categories"
                            proptype="int"
                            value={currentGame.categories}
                            onChange={changeGameState}>
                            <option value="0">Select a Category</option>
                            {categories.map(cat => (
                                <option key = {cat.id} value={cat.id}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </fieldset>
            <button type ="submit" 
                onClick={evt => {
                    evt.preventDefault()
                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        maker: currentGame.maker,
                        year_released: parseInt(currentGame.year_released),
                        num_of_players: parseInt(currentGame.num_of_players),
                        est_time_to_play_minutes: parseInt(currentGame.est_time_to_play_minutes),
                        age_rec: parseInt(currentGame.age_rec),
                        gamer: parseInt(localStorage.getItem("token")),
                        categories: parseInt(currentGame.categories)
                    }

                    createGame(game)
                        .then(()=> history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
            </form>
        </>
    )
}