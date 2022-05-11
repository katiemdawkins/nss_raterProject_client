export const getGames = () =>{
    return fetch(`http://localhost:8000/games`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => response.json())
}

export const getGameById = (gameId) => {
    return fetch (`http://localhost:8000/games/${gameId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    }) 
    .then(res => res.json())
}

export const getCategories = () =>{
    return fetch(`http://localhost:8000/categories`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => response.json())
}

export const getReviews = () =>{
    return fetch(`http://localhost:8000/gamereviews`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", { 
    method: "POST",    
    headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game) 
    }).then(getGames)
}

export const createReview = (review) => {
    return fetch(`http://localhost:8000/gamereviews`, { 
    method: "POST",    
    headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review) 
    }).then(getReviews)
}