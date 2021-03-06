//
//  simple fade-in
var FadeIn = (function(){
  
  var body = document.querySelector('body');
  var links = document.querySelectorAll('a:not([target])');

  function Init() {
    if (!body) {
      return;
    }

    _AddEventListeners();
    _Fade();
  }

  function _AddEventListeners() {
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', _HandleClick);
    }
  }

  function _HandleClick(e) {
    var next = e.getAttribute('href');
    e.preventDefault();
    _Fade();
    SetTimeout(function(){
      window.location.href = next;
    }, 750);
  }

  function _Fade() {
    body.classList.toggle('in');
  }

  return {
    init: Init
  }

})();
FadeIn.init();

//
//  simple lightbox for posts
var LightBox = (function(){

  var lightBoxBackdrop;
  var lightBoxImage = document.querySelectorAll('[data-toggle="lightbox"]');

  function Init() {
    if (lightBoxImage.length == 0) {
      return;
    }

    _BuildBackdrop();
    _AddEventListeners();
  }

  function _BuildBackdrop() {
    lightBoxBackdrop = document.createElement('DIV');
    lightBoxBackdrop.setAttribute('onclick', 'LightBox.toggle()');
    lightBoxBackdrop.setAttribute('class', 'lightbox__backdrop');
    document.body.appendChild(lightBoxBackdrop);
  }

  function _AddEventListeners() {
    for (var i = 0; i < lightBoxImage.length; i++) {
      lightBoxImage[i].addEventListener('click', _ToggleLightBox);
    }
  }

  function _ToggleLightBox(evt) {
    _ToggleBackdropWithImage(evt.target);
  }

  function _ToggleBackdropWithImage(image) {
    activeImage = 'background-image: url(' + image.getAttribute('src') + ')';
    lightBoxBackdrop.setAttribute('style', activeImage);
    ToggleBackdropVisibility();
  }

  function ToggleBackdropVisibility() {
    lightBoxBackdrop.classList.toggle('in');
  }

  return {
    init: Init,
    toggle: ToggleBackdropVisibility
  }

})();
LightBox.init();
