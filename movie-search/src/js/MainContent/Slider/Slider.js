export default function createSlider() {

    // const url = `https://www.omdbapi.com/?s=dream&page=${page}&apikey=bfcf5d6`;

    // return fetch(url)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //   });
     
//      <div class="swiper-container">
//      <!-- Additional required wrapper -->
//      <div class="swiper-wrapper">
//          <!-- Slides -->
//          <div class="swiper-slide">Slide 1</div>
//          <div class="swiper-slide">Slide 2</div>
//          <div class="swiper-slide">Slide 3</div>
//          ...
//      </div>
//      <!-- If we need pagination -->
//      <!-- <div class="swiper-pagination"></div> -->
 
//      <!-- If we need navigation buttons -->
//      <div class="swiper-button-prev"></div>
//      <div class="swiper-button-next"></div>
 
//      <!-- If we need scrollbar -->
//      <!-- <div class="swiper-scrollbar"></div> -->
//  </div> 
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