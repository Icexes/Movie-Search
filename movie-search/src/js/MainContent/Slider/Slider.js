export default function createSlider() {
    const swiper = document.createElement('div');
    swiper.classList.add('swiper');  
    const swiperContainer = document.createElement('div');
    swiperContainer.classList.add('swiper-container');
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');  
    const swiperBtnPrev = document.createElement('div');
    swiperBtnPrev.classList.add('swiper-button-prev');
    const swiperBtnNext = document.createElement('div');
    swiperBtnNext.classList.add('swiper-button-next');
    const scrollbar = document.createElement('div');
    scrollbar.classList.add('swiper-scrollbar'); 
    swiperContainer.append(swiperWrapper ,scrollbar);
    swiper.append(swiperContainer,swiperBtnPrev, swiperBtnNext);
    return swiper;
}