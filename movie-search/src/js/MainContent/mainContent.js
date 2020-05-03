import createSlider from './Slider/Slider';
import createKeyBoard from './Keyboard/Keyboard';

export default function createMainContent() {

//     <form action="" method="get">
//     <input name="s" placeholder="Искать здесь..." type="search">
//     <button type="submit">Поиск</button>
//   </form>
    const main = document.createElement('main');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const searchForm = document.createElement('form');
    searchForm.classList.add('search-form');
    searchForm.action = '';
    searchForm.method = 'get';
    const searchFormWrapper = document.createElement('div');
    searchFormWrapper.classList.add('search-form__wrapper');

    const inputRow = document.createElement('input');
    inputRow.classList.add('search-form__input-row');
    inputRow.placeholder = 'Search here...';
    inputRow.type='text';
    inputRow.name='search';
    const searchButton = document.createElement('button');
    searchButton.classList.add('search-form__submit');
    searchButton.textContent = 'Search';
    const keyboardButton = document.createElement('button');
    keyboardButton.classList.add('search-form__keyboard-btn');
    keyboardButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        const keyboard = document.querySelector('.keyboard');
        keyboard.classList.toggle('keyboard--show');
    })
    const clearInputBtn = document.createElement('button');
    clearInputBtn.classList.add('search-form__clear-input');
    searchFormWrapper.append(inputRow, searchButton, keyboardButton, clearInputBtn);
    searchForm.append(searchFormWrapper);

    
    const slider = createSlider(4);


    wrapper.append(searchForm, slider);
    main.append(wrapper);
    document.body.append(main);
    createKeyBoard();
    return main;

}