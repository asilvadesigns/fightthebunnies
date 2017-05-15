//(function(){
//  document.addEventListener('DOMContentLoaded', setTimeout(function() {
//    ToggleFade();
//  }, 100));
//
//  var links = document.querySelectorAll('[href]');
//  for (var i = 0; i < links.length; i++) {
//    links[i].addEventListener('click', ToggleFadeLinks);
//  }
//
//  function ToggleFade() {
//    var toggleFade = document.querySelector('[data-toggle="fade"]');
//    toggleFade.classList.toggle('in');
//  }
//
//  function ToggleFadeLinks(evt) {
//    evt.preventDefault;
//    var goTo = evt.target.getAttribute('href');
//    toggleFade.classList.toggle('in');
//    setTimeout(function() {
//      window.location.href = goTo;
//    }, 100);
//  }
//})();
