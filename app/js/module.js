/* Overlay menu */
let menu = (function(options) {

  let button = document.querySelector(options.button);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');
  let link = document.querySelectorAll(".overlay-menu__link");
  



  let _toggleMenu = function(e) {
    button.classList.toggle('hamburger-bar--active');
    menu.classList.toggle('overlay--open');
    body.classList.toggle('body-active-menu');
  }

  let addListeners = function() {
    button.addEventListener('click', _toggleMenu);
    for (key in link) {
        link[key].addEventListener('click', _toggleMenu);
      }
  }

  
  return {
      openMenu: addListeners
    };

})({
  button: '#toggle',
  menu: '#overlay'
});

menu.openMenu();






/*end overlay menu */