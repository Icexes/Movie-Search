import createSlider from './Slider/Slider';
import createKeyBoard from './Keyboard/Keyboard';

export default function createMainContent() {

    const main = document.createElement('main');
    main.classList.add('main');
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    const searchForm = document.createElement('form');
    searchForm.classList.add('search-form');
    searchForm.action = '';
    searchForm.method = 'get';
    const searchFormWrapper = document.createElement('div');
    searchFormWrapper.classList.add('search-form__wrapper');

    const inputRow = document.createElement('input');
    inputRow.autocomplete = 'off';
    inputRow.classList.add('search-form__input-row');
    inputRow.placeholder = 'Search here...';
    inputRow.type='text';
    inputRow.name='search';
    const searchButton = document.createElement('button');
    searchButton.classList.add('search-form__submit');
    searchButton.textContent = 'Search';
    const keyboardBtn = document.createElement('button');
    keyboardBtn.classList.add('search-form__keyboard-btn');
    keyboardBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        const keyboard = document.querySelector('.keyboard');
        keyboard.classList.toggle('keyboard--show');
    })
    const constrolsButtons = document.createElement('div');
    constrolsButtons.classList.add('search-form__controls');
    const clearInputBtn = document.createElement('button');
    clearInputBtn.classList.add('search-form__clear-input');

    const voiceRecorderBtn = document.createElement('button');
    voiceRecorderBtn.classList.add('search-form__voice-recorder');
    constrolsButtons.append(searchButton,voiceRecorderBtn);
    searchFormWrapper.append(inputRow, constrolsButtons, keyboardBtn, clearInputBtn);
    searchForm.append(searchFormWrapper);

    
    const slider = createSlider();
    const spinner = document.createElement('div');
    for (let i = 0; i< 3; i +=1) {
        const div = document.createElement('div');
        spinner.append(div);
    }
    spinner.classList.add('spinner');
    slider.append(spinner);

    const logWindow = document.createElement('div');
    logWindow.classList.add('log-window');

    wrapper.append(searchForm, logWindow, slider);
    main.append(wrapper);
    document.body.append(main);
    createKeyBoard();
    return main;

}