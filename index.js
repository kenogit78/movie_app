const search = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-button")
let message = document.getElementById("movie-section")
const apiKey = "f2bd1f9f"
let imdbIdArray = []
const storeMovie = document.querySelector(".store-movies")
let Id

function showMessage() {
    message.innerHTML = 
        `
            <img id="movie-film" src="img/movie.svg">
            <h3 id="movie-list-start">Start exploring</h3>
        `
}

showMessage()

function hideMessageDisplayed() {
    message.innerHTML = ""
}

function searchForMovies() {
    if(search.value.length < 3) {
        message.innerHTML = `<h2>Unable to locate your film.</h2>
            <h2>Please input at least three characters in the search box above.</h2>`
    } else if (search.value !== "") {
        searchBtn.disabled = false
        hideMessageDisplayed()
        renderMovies()
    }
}
    
function renderMovies() {
    fetch(`https://www.omdbapi.com/?s=${search.value}&t=&type=movie&page=1&apikey=${apiKey}`)
        .then(response =>  response.json())
        .then(data => {
            for (let movie of data.Search) {
                fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`)
                .then((res) => res.json())
                .then(data => {
                    const movieListing = 
                        `<div class="movie-results" id="minus" data-show="true">
                            <div class="movie-col-1">
                                <img src="${data.Poster}" class="movie-size">
                            </div>
                            <div class="movie-col-2">
                                <div class="movie-title-rating">
                                    <h3 class="movie-info">${data.Title}</h3>
                                    <p><img src="img/star.png" class="icons">${data.Rated}</p>
                                </div>
                                <div class="movie-runtime">
                                    <p>${data.Runtime}  ${data.Genre}  <button class="store-movies"><img src="img/plus.png" class="icons" data-show="${data.ID}"></button class="add-movie"> Watchlist</p>
                                </div>
                                <div class="para-plot">
                                    <p>${data.Plot}</p>
                                </div>
                            </div>
                        </div>
                        <hr>`
                    message.innerHTML += movieListing
                    
                    btnAddToWatchlist(data)
                })  
                
        } 
        // btnAddToWatchlist() 
    // btnAddToWatchlist()
    }) 
}

function btnAddToWatchlist(movies) {
    console.log(movies)
    storeMovie.innerHTML = movies.imdbID
}


// function btnAddToWatchlist(movie){
//     Id = data.ID
//     storeMovie.innerHTML = Id
// }


function getFromLocalStorage() {
    let storedMovieArray = localStorage.getItem("movie")
    movieArray = JSON.parse(storedMovieArray)
}
    
    
searchBtn.addEventListener("click", searchForMovies)
    
    
message.addEventListener("click", function(e) {
    if(e.target.dataset.show) {
        btnAddToWatchlist(e.target.dataset.show)
    }
})

// if (storeMovie)
storeMovie.addEventListener("click", function(e) {
    if(e.target.dataset.show) {
        btnAddToWatchlist(e.target.dataset.show)
    }
})
            
            
document.addEventListener("click", function(e){
    // console.log(e.target.dataset.show)
    
})
    
function movieSelected(id) {
    localStorage("movieId", id)
    window.location = "movie.html"
    return false
}

// function btnAddToWatchlist() {
//     storeMovie.innerHTML = data.ID
    // fetch(`https://www.omdbapi.com/?s=${search.value}&t=&type=movie&page=1&apikey=${apiKey}`)
    //     .then(res => res.json())
    //     .then(data => {
            // console.log(data)
        //     let movieList = ""
            
        //         data.Search.forEach(function(movieResult) {
        //             movieList += 
        //                 `
        //                 <p data-show>${movieResult.imdbID}</p>
        //                 <hr>
        //                 `
        //                 // console.log(movieList)
        //                 message.innerHTML += movieList
                        
        //             function renderToWatchlist() {
        //                document.getElementById("watch-list").innerHTML += movieList
        //             }
        //             renderToWatchlist()
        //             // return movieList  
        //         })   
        // })
// }
   
