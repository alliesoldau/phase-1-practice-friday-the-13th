let movieNav = document.getElementById("movie-list")
let movieHighlight = document.getElementById("movie-info")

// Fetch movie data
fetch('http://localhost:3000/movies')
.then (response => response.json())
.then ((object) => {object.forEach((renderImages))})

// Render images (and add event listener to them) to nav bar
function renderImages(movie) {
    let imageURL = movie.image
    let movieImage = document.createElement('img')
    movieImage.src = imageURL
    movieImage.addEventListener('click', () => renderMovieInfo(movie))
    movieNav.appendChild(movieImage)
}

// Once DOM loads autoload first movie to see its info
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3000/movies')
    .then (response => response.json())
    .then (object => renderMovieInfo(object[0]))
    })

function renderMovieInfo(movie){
    let movieImage = document.getElementById("detail-image")
    movieImage.src = movie.image
    let movieTitle = document.getElementById("title")
    movieTitle.innerText = movie.title
    let movieYear = document.getElementById("year-released")
    movieYear.innerText = `Release Year: ${movie.release_year}`
    let movieDesc = document.getElementById("description")
    movieDesc.innerText = movie.description
    let movieWatchButton = document.getElementById("watched")
    movieWatchButton.className = movie.id
    movieWatchButton.innerText = movie.watched ? 'Watched' : 'Unwatched'
    let movieBlood = document.getElementById("amount")
    movieBlood.innerText = movie.blood_amount
}

let movieWatchButton = document.getElementById("watched")
movieWatchButton.addEventListener('click', (e) => watchButtonFetch(e.target.className))

function watchButtonFetch(movie) {
    fetch(`http://localhost:3000/movies/${movie}`, {
        method: 'PATCH',
        body: JSON.stringify({
            watched: movie.watched 
        }),
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
       })
       .then (response => response.json())
       .then ((data) => {changeWatchStatus(data)}) 
    }

function changeWatchStatus(movieData) {
    console.log(`before flip" ${movieData.watched}`)
    movieData.watched =! movieData.watched
    console.log(`after flip" ${movieData.watched}`)
    // return movieData.watched
    renderMovieInfo(movieData)
}
    


    // if (movie.innerText === "Unwatched") {
    //     movie.innerText = "Watched"
    // } else {
    //     movie.innerText = "Unwatched"
    // }
    // I NEED TO PATCH THESE TO ACTUALLY UPDATE THE WATCHED STATUS IN THE DATA SET
    // I JUST CHANGED THE INNER TEXT HERE BUT I HAVE TO ACTUALLY CHANGE THE VALUE OF THE WATCHED KEY
    // AND MAKE SURE TO THEN UPDATE THE DOM TO REFLECT THE NEW VALUE FOR THE BUTTON
// }