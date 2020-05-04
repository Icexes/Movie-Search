import Swiper from '../../node_modules/swiper/js/swiper'
import '../css/style.css';
import '../css/style.scss';
import createHeader from './Header/header';
import createMainContent from './MainContent/mainContent'

 
    const key = 'bfcf5d6';
    let currentPage = 1;
    let request = 'home';
    const getMovieTitle = (page, keyValue, requestData) => {
    const url = `https://www.omdbapi.com/?s=${requestData}&type=movie&page=${page}&apikey=${keyValue}`;

    return fetch(url)
    .then(res => res.json());
}

const getRate = (imdbID, keyValue) => {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${keyValue}`;

    return fetch(url)
    .then(res => res.json())
    .then(data => {console.log(data.imdbRating); return data.imdbRating});
    
}
const getTranslateWord = (word) => {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;

    return fetch(url)
    .then(res => res.json())
    .then(data => data.text[0]);
}


// getTranslateWord('хлеб');
//  getRate('day');
createHeader();
createMainContent();
// getMovieTitle(currentPage, key, 'home');
const swiper = new Swiper ('.swiper-container', {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 20,
    breakpoints: {
        50: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1300 : {
            slidesPerView: 4,
            spaceBetween: 20,
        }
    },
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })
  console.log(swiper);


  const createMovieCard = (title, year, imgSrc, rate, id) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    const card = document.createElement('a');
    card.classList.add('card-film');
    card.href = `https://www.imdb.com/title/${id}/videogallery/`;
    const poster = document.createElement('img');
    poster.classList.add('card-film__poster');
    poster.src = imgSrc;
    const filmName = document.createElement('p');
    filmName.classList.add('card-film__name');
    filmName.textContent = title;
    const filmInfo = document.createElement('div');
    filmInfo.classList.add('card-film__info');
    const filmYear = document.createElement('span');
    filmYear.classList.add('card-film__year');
    filmYear.textContent = year;
    const filmRate = document.createElement('span');
    filmRate.classList.add('card-film__rate');
    filmRate.textContent = rate;
    filmInfo.append(filmYear, filmRate);
    card.append(poster, filmName, filmInfo);
    slide.append(card);
    swiper.appendSlide(slide);
}

  const getMovies = () => {
    getTranslateWord(request)
    .then(translate => {
        getMovieTitle(currentPage, key, translate)
        .then(data => {
           const searchResult = data.Search;
        //    const totalResults = data.totalResult;
        //    console.log(totalResults);
           return searchResult;
        })
        .then(filmInfo => {
            filmInfo.forEach(film => {
                getRate(film.imdbID,key)
                .then(rate =>{
                createMovieCard(film.Title, film.Year, film.Poster, rate, film.imdbID)});
            })
        })
    })

}

getMovies();
swiper.on('reachEnd', () => {
    currentPage += 1;
    getMovies();
});

const textInput = document.querySelector('.search-form__input-row');
const searchFormSubmitBtn = document.querySelector('.search-form__submit');
searchFormSubmitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    request = textInput.value;
    swiper.removeAllSlides();
    getMovies();
});

const clearInputBtn = document.querySelector('.search-form__clear-input');
clearInputBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    textInput.value = '';

})
