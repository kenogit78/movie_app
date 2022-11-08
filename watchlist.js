//had to make another js file since kept getting null when console logging the watchList element which is on watchlist.html not index.html, don't know if there is a better way to do this or not



let watchList = document.getElementById("watch-list")
console.log(watchList)


function btnAddToWatchlist(movies) {
    console.log(movies)
    // storeMovie.innerHTML = movies.imdbID
    // let listing = movies.imdbID
    // for (let i = 0; i < movies.length; i++)
    // listing[0] = movies[i].imdbID
    // imdbIdArray.push(listing)
    // localStorage.setItem("movies", JSON.stringify(movies))
    html = ""
    html = 
    `<div class="movie-results" id="minus" data-show="true">
    <div class="movie-col-1">
        <img src="${movies.Poster}" class="movie-size">
    </div>
    <div class="movie-col-2">
        <div class="movie-title-rating">
            <h3 class="movie-info">${movies.Title}</h3>
            <p><img src="img/star.png" class="icons">${movies.Rated}</p>
        </div>
        <div class="movie-runtime">
            <p>${movies.Runtime}  ${movies.Genre}  <button class="store-movies"><img src="img/plus.png" class="icons" data-show="${movies.ID}"></button class="add-movie"> Watchlist</p>
        </div>
        <div class="para-plot">
            <p>${movies.Plot}</p>
        </div>
    </div>
</div>
<hr>
        `
        watchList += html

}