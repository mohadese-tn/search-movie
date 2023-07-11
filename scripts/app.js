// select Elements
let searchInput=document.querySelector('.search-input');
let searchList=document.querySelector('.search-list');
let resultList=document.querySelector('.result');

// load movies from API
async function loadMovies(mymovie){
    const apiurl=`https://www.omdbapi.com/?s=${mymovie}&page=1&apikey=279a96a4`;
    const res=await fetch(` ${apiurl}`);
    const data=await res.json();
    // console.log(data);
    if(data.Response="True") {
        // console.log(data.Search); 
        displayMovieList(data.Search)
    }    
}

// find movie from input
searchInput.addEventListener('keyup',function findMovies(){
    let mymovie=searchInput.value.trim();
    if(mymovie.length>0){
        searchList.classList.remove('hide-list-item');
        loadMovies(mymovie);
    }else{
        searchList.classList.add("hide-list-item");
    }
})

// display list of movie
function displayMovieList(movies){
    searchList.innerHTML="";
    for (let index = 0; index < movies.length; index++) {
        let movielistitem=document.createElement('div');
        movielistitem.dataset.id=movies[index].imdbID;
        movielistitem.classList.add('search-list-item');
        let Poster
        if (movies[index].Poster != "N/A"){
            Poster= movies[index].Poster;
        }else{
            Poster="./images/image_not_found.png";
        };
        movielistitem.innerHTML=`
            <div class="search-list-item-image">
                <img src="${Poster}" class="search-item-img">
            </div>
            <div class="search-list-item-info">
                <h3 >${movies[index].Title}</h3>
                <p >${movies[index].Year}</p>
            </div>`;
        searchList.appendChild(movielistitem);
    }
    loadMovieDetails();
}

// for load details of movie from new api
function loadMovieDetails(){
    const myMovieList=document.querySelectorAll('.search-list-item');
    // console.log(myMovieList);
    myMovieList.forEach(movie => {
        movie.addEventListener("click", async () =>{
            searchList.classList.add('hide-list-item');
            const result= await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=279a96a4`);
            const movieDetails=await result.json();
            // console.log(details);
            displayMovieDetails(movieDetails)
        })
    });
    
}

// for display deatils of movie in DOM
function displayMovieDetails(details){
    searchInput.value=details.Title;

    resultList.innerHTML=`
        <div class="movie-poster">
            <img src="${(details.Poster !="N/A") ? details.Poster:"./images/image_not_found.png"}" >
        </div>
        <div class="movie-info">
            <h3 class="movie-title">${details.Title}</h3>
            <ul class="movie-misc-info">
                <li class="year">year : ${details.Year}</li>
                <li class="rated">rating : ${details.Rated}</li>
                <li class="released">released : ${details.Released}</li>
            </ul>
            <p class = "genre"><b>Genre :</b> ${details.Genre}</p>
            <p class = "writer"><b>Writer :</b> ${details.Writer}</p>
            <p class = "actors"><b>Actors : </b> ${details.Actors}</p>
            <p class = "plot"><b>Plot :</b> ${details.Plot}</p>
            <p class = "language"><b><i>Language :</i> </b> ${details.Language}</p>
            <p class = "awards"><b><i class = "fas fa-award"></i></b>  ${details.Awards}</p>
        </div>`;

}

// close the searchlist with click out of search menu
window.addEventListener("click", (Event)=>{
    if (Event.target.classList != "search-input"){
        searchList.classList.add('hide-list-item');
    }else{
        searchList.classList.remove('hide-list-item');
    }
});