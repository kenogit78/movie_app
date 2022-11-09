const search = document.getElementById("search-bar")
const searchBtn = document.getElementById("search-button")
let message = document.getElementById("movie-section")
const apiKey = "f2bd1f9f"
let imdbIdArray = []
let allMovies = []
let storeMovie = document.querySelector(".store-movies")
let Id
// let watchList = document.getElementById("watch-list")
// console.log(watchList)

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
        message.innerHTML = 
            `
            <h2>Unable to locate your film.</h2>
            <h2>Please input at least three characters in the search box above.</h2>
            `
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
                    allMovies.push(data)
                    // console.log(allMovies)
                    const movieListing = 
                        `
                        <div class="movie-results" id="minus" data-show="true">
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
                        <hr>
                        `
                    message.innerHTML += movieListing
                    // console.log(data)
                    btnAddToWatchlist(data)
                })  
                
        }
    }) 
}

storeMovie.addEventListener("click", btnAddToWatchlist)


function btnAddToWatchlist(movies) {
    // storeMovie.innerHTML = movies.imdbID
    // let listing = movies.imdbID
    let id = movies.imdbID
    // console.log(id)
    imdbIdArray.push(id)
    console.log(imdbIdArray)
    // for (let i = 0; i < id.length; i++) {
    //     movieId = id[i]
    //     console.log(movieId)
    // }

    // listing[0] = movies[i].imdbID
    // imdbIdArray.push(listing)
    // localStorage.setItem("movies", JSON.stringify(id))
    localStorage.setItem("movies", JSON.stringify(id))
    // html = ""
    // html = 
    //     `
    //     <div class="movie-results" id="minus" data-show="true">
    //         <div class="movie-col-1">
    //             <img src="${movies.Poster}" class="movie-size">
    //         </div>
    //         <div class="movie-col-2">
    //             <div class="movie-title-rating">
    //                 <h3 class="movie-info">${movies.Title}</h3>
    //                 <p><img src="img/star.png" class="icons">${movies.Rated}</p>
    //             </div>
    //         </div>
    //         <div class="movie-runtime">
    //             <p>${movies.Runtime}  ${movies.Genre}  <button class="store-movies"><img src="img/plus.png" class="icons" data-show="${movies.ID}"></button class="add-movie"> Watchlist</p>
    //         </div>
    //         <div class="para-plot">
    //             <p>${movies.Plot}</p>
    //         </div>
    //     </div>  
    //     <hr>
    //     `
        // console.log(movies)
        // imdbIdArray.push(id)
}


function getFromLocalStorage() {
    let storedMovieArray = []
    storedMovieArray = localStorage.getItem("movie")
    movieArray = JSON.parse(storedMovieArray)
    // console.log(storedMovieArray)
}
    
getFromLocalStorage() 

searchBtn.addEventListener("click", searchForMovies)
    
message.addEventListener("click", function(e) {
    if(e.target.dataset.show) {
        btnAddToWatchlist(e.target.dataset.show)
    }
})

document.addEventListener("click", function(e){
    if(e.target.dataset.show) {
        btnAddToWatchlist(e.target.dataset.show)
    }
})

// if (storeMovie)
// storeMovie.addEventListener("click", function(e) {
//     if(e.target.dataset.show) {
//         btnAddToWatchlist(e.target.dataset.show)
//     }
// })
            
            

    
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
/****************************************/
   
// function displayMovieList(movies){
//     searchList.innerHTML = "";
//     for(let idx = 0; idx < movies.length; idx++){
//         let movieListItem = document.createElement('div');
//         movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
//         movieListItem.classList.add('search-list-item');
//         if(movies[idx].Poster != "N/A")
//             moviePoster = movies[idx].Poster;
//         else 
//             moviePoster = "image_not_found.png";

//         movieListItem.innerHTML = `
//         <div class = "search-item-thumbnail">
//             <img src = "${moviePoster}">
//         </div>
//         <div class = "search-item-info">
//             <h3>${movies[idx].Title}</h3>
//             <p>${movies[idx].Year}</p>
//         </div>
//         `;
//         searchList.appendChild(movieListItem);
//     }
//     loadMovieDetails();
// }

// function loadMovieDetails(){
//     const searchListMovies = searchList.querySelectorAll('.search-list-item');
//     searchListMovies.forEach(movie => {
//         movie.addEventListener('click', async () => {
//             // console.log(movie.dataset.id);
//             searchList.classList.add('hide-search-list');
//             movieSearchBox.value = "";
//             const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=fc1fef96`);
//             const movieDetails = await result.json();
//             // console.log(movieDetails);
//             displayMovieDetails(movieDetails);
//         });
//     });
// }