var Carousel = (function(){

  var SLIDES = document.querySelectorAll('.carousel__item');
  var PREV = document.querySelector('.carousel__prev');
  var NEXT = document.querySelector('.carousel__next');

  var counter = 0;
  var currentSlide = SLIDES[counter];

  function Init() {
    _AddEventListeners();
    _Render();
  }

  function PrevSlide() {
    _DisableControls();
    _Decrement();
  }

  function NextSlide() {
    _DisableControls();
    _Increment();
  }

  function _AddEventListeners() {
    SLIDES.forEach(function(item) {
      item.addEventListener('transitionend', function() {
        PREV.removeAttribute("disabled");
        NEXT.removeAttribute("disabled");
      })
    });
  }

  function _Decrement() {
    if (counter != 0) {
      counter = counter - 1;
    } else {
      counter = SLIDES.length - 1;
    }

    _Render();
  }

  function _Increment() {
    if (counter != SLIDES.length - 1) {
      counter = counter + 1;
    } else {
      counter = 0;
    }

    _Render();
  }

  function _DisableControls() {
    PREV.setAttribute("disabled", true);
    NEXT.setAttribute("disabled", true);
  }

  function _ToggleActiveSlide() {
    SLIDES.forEach(function(item) {
      item.classList.remove('active');
    });
    SLIDES[counter].classList.add('active');
  }

  function _Render() {
    _ToggleActiveSlide();
  }

  return {
    init: Init,
    prev: PrevSlide,
    next: NextSlide
  }

})();
Carousel.init();
