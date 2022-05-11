import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createReview } from "./GameManager"

export const ReviewForm = () => {
    const {gameId} = useParams()

    const [userReview, setReview] = useState({
        game: gameId,
        gamer:0,
        content:""
    })

    const history = useHistory()

    const changeReviewState = (evt) => {
        const newReview = Object.assign({}, userReview)
        newReview[evt.target.name]= evt.target.value
        setReview(newReview)
    }

    return(
        <>
        <h3>Submit your review for {userReview.game}</h3>
        <form>
            <fieldset>
                <div className="form-group">
                        <label htmlFor="content">Review: </label>
                        <textarea type="text" name="content" required autoFocus className="form-control"
                            value={userReview.content}
                            onChange={changeReviewState}
                        />
                </div>
                <button type="submit" onClick={ evt => {
                    evt.preventDefault()
                    const review = {
                        game: parseInt(gameId),
                        gamer:parseInt(localStorage.getItem("token")),
                        content: userReview.content
                    }
                    createReview(review)
                        .then(()=> history.push(`/games/${gameId}`))
                }}>Submit</button>
            </fieldset>
        </form>
        </>
    )
}

