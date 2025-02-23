const API_KEY = '575feb455b5a061cce0d77d4f0b61c7e'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = `${BASE_URL}/search/movie?${API_KEY}` ;


const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



let getMovies = async (url) => {
    
    // let raw = await fetch( API_URL);
    // let data = await raw.json();
    
    // return data;
    
    fetch(url)
        .then(res => res.json())
        .then(data => {
                console.log(data.results);
                showMovies(data.results);
            })
            .catch(error => console.error('Error fetching movies:', error));
    }
    getMovies(API_URL);

function showMovies(data) {
    main.innerHTML = '';
    data.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
              ${overview}
        </div>`;

        main.appendChild(movieEl);
    });
}


function getColor(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    console.log(searchTerm);

    if (searchTerm) {
        try {
            let data = await getMovies(searchURL + '&query=' + searchTerm); 
            console.log(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    } else {
        try {
            let data = await getMovies(API_URL);
            console.log(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }
});


