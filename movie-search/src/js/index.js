import Swiper from '../../node_modules/swiper/js/swiper';
import '../css/style.css';
import '../css/style.scss';
import createHeader from './Header/header';
import createMainContent from './MainContent/mainContent';
import createFooter from './Footer/Footer';
import createSpeechRecognition from './MainContent/SpeechRecognition/SpeechRecognition';
import playAudio from './MainContent/PlayAudio/PlayAudio';
import isRussian from './Helper/IsRussian'

class ApiError extends Error {
    constructor(message, fromPromise) {
        super(message);
        this.fromApi = fromPromise;
    }
}
const key = 'e4642a3b'
let currentPage = 1;
let totalPages = 0;
let previousStateCurrentPage = currentPage;
let request = 'home';
let prevRequest = request;

const getMovieTitle = (page, keyValue, requestData) => {
    const url = `https://www.omdbapi.com/?s=${requestData}&type=movie&page=${page}&apikey=${keyValue}`;

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.Response === 'True') {
                const searchResult = data.Search;
                totalPages = Math.round(data.totalResults / 10);
                return searchResult;
            }
            throw new ApiError(data.Error, 'omdbapi');
        })
}
const getRate = (imdbID, keyValue) => {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${keyValue}`;
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.Response === 'True') {
                return data.imdbRating
            }
            throw new ApiError(data.Error, 'omdbapi');
        });

}
const getTranslateWord = (word) => {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;
    return fetch(url)
        .then(res => res.json())
        .then(translateData => {
            if (translateData.code >= 400) throw new ApiError(translateData.message, 'yandex');
            return translateData.text[0]
        })
}
createHeader();
createMainContent();
createFooter();
const textInput = document.querySelector('.search-form__input-row');
textInput.focus();
const logWindow = document.querySelector('.log-window');
const searchForm = document.querySelector('.search-form');
const swiperContainer = document.querySelector('.swiper-container');
const swiper = new Swiper('.swiper-container', {
    centerInsufficientSlides: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 100,
        },
        760: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 25,
        },
        1350: {
            slidesPerView: 4,
            spaceBetween: 25,
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

const createMovieCard = (title, year, imgSrc, rate, id) => {

    const cardImageSrc = imgSrc;
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    const card = document.createElement('a');
    card.classList.add('card-film');
    card.href = `https://www.imdb.com/title/${id}/videogallery/`;
    const poster = document.createElement('img');
    poster.classList.add('card-film__poster');
    poster.src = cardImageSrc === 'N/A' ? 'img/no-poster.png' : cardImageSrc;
    poster.onerror = () => {
        poster.src = 'img/no-poster.png'
    };
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
    return slide;
}

const getMovies = () => {
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('spinner--show');
    getTranslateWord(request)
        .then(translate => getMovieTitle(currentPage, key, translate))
        .then(filmInfo => {
            const rates = filmInfo.map(film => getRate(film.imdbID, key));
            return Promise.all(rates).then(ratesArr => {
                return {
                    ratesArr,
                    filmInfo
                };
            });
        })
        .then(cardsData => {
            const cards = [];
            cardsData.filmInfo.forEach((film, index) => cards.push(createMovieCard(film.Title, film.Year, film.Poster, cardsData.ratesArr[index], film.imdbID)))
            if (currentPage === 1 && cardsData.filmInfo.length !== 0) {
                swiper.removeAllSlides();
                swiper.update()
            }
            swiper.appendSlide(cards);
            swiper.update();
        }).catch((err) => {
            setTimeout(() => {
                currentPage = previousStateCurrentPage;
                if (err instanceof ApiError) {
                    if (err.fromApi === 'yandex') {
                        logWindow.textContent = `Yandex API Error: ${err.message}`;
                    } else if (err.fromApi === 'omdbapi') {
                        if (err.message.includes('not found')) {
                            logWindow.textContent = `No results were found for '${request}'`;
                        } else logWindow.textContent = `${err.message.slice(0,-1)} for '${request}'`;
                    }
                } else logWindow.textContent = err.message;
                request = prevRequest;
            }, 500);
        })
        .finally(() => {
            setTimeout(() => {
                spinner.classList.remove('spinner--show');
                swiperContainer.classList.remove('swiper-container--hidden');
            }, 500);

        })

}

getMovies();
swiper.on('reachEnd', () => {
    if (document.querySelector(".swiper-slide") === null) return;
    currentPage += 1;
    if (currentPage <= totalPages) getMovies();
});


const recognition = createSpeechRecognition();
recognition.addEventListener('result', (event) => {
    playAudio('audio/end.mp3');
    recognition.stop();
    let result = '';
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
        result += event.results[i][0].transcript;
    }
    textInput.value = result;
    const click = new Event('click', {
        "bubbles": true,
        "cancelable": false
    });
    document.querySelector('.search-form__submit').dispatchEvent(click);
})

recognition.addEventListener('error', (event) => {
    playAudio('audio/err.mp3');
    logWindow.textContent = `Error occurred in recognition: ${event.error}`;
});

searchForm.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.closest('.search-form__clear-input')) {
        textInput.value = '';
    } else if (event.target.closest('.search-form__submit')) {
        if (textInput.value === '') return;
        if (document.querySelector('.keyboard--show')) {
            document.querySelector('.keyboard--show').classList.remove('keyboard--show');
        }
        previousStateCurrentPage = currentPage;
        currentPage = 1;
        prevRequest = request;
        request = textInput.value;
        logWindow.textContent = isRussian(request) ? `Showing results for '${request}'` : '';
        swiperContainer.classList.add('swiper-container--hidden');
        getMovies();
    } else if (event.target.closest('.search-form__voice-recorder')) {
        playAudio('audio/start.mp3');
        recognition.start();
    }
});