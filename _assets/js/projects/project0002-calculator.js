var Calculator = (function(){

  var calculator = document.querySelector('.calculator');
  var menu__toggle = document.querySelector('.menu__toggle');
  var menu__items = calculator.querySelectorAll('.menu__item');

  function Init() {
    _AddEventListeners();
  }

  function _AddEventListeners() {
    menu__toggle.addEventListener('click', _ToggleMenuSlide);
    menu__items.forEach(function(item){ item.addEventListener('click', _ToggleKeysActiveState) })
  }

  function _ToggleMenuSlide() {
    calculator.classList.toggle('menu--active');
  }

  function _ToggleKeysActiveState(evt) {
    menu__items.forEach(function(key){ key.classList.remove('active') })
    evt.target.classList.add('active');
  }

  return {
    init: Init
  }

})();
Calculator.init();
