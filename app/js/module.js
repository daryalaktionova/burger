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
        for (i=0;i<link.length;i++){
          link[i].addEventListener('click', _toggleMenu);
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

/*Accodeon team*/
let teamAccordeon = (function(options) {

    let linkAccordeon = document.querySelectorAll(options.link);

    let _toggleAccordeon = function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('accordeon__item--is-active');
    }

    let addListenersAccordeon = function() {
       for (i=0;i<linkAccordeon.length;i++){
          linkAccordeon[i].addEventListener('click', _toggleAccordeon);
        }
    }



    
    return {
        openItemAccordeon: addListenersAccordeon
      };

  })({
    link: '.accordeon__link'
  });

  teamAccordeon.openItemAccordeon();


/*end Accordeon team */


/*Accordeon menu */
let menuAccordeon = (function(options) {

    let linkAccordeonMenu = document.querySelectorAll(options.link);

    let _toggleAccordeonMenu = function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('accordeon-menu__item--is-active');
    }

    let addListenersAccordeonMenu = function() {
       for (i=0;i<linkAccordeonMenu.length;i++){
          linkAccordeonMenu[i].addEventListener('click', _toggleAccordeonMenu);
        }
    }



    
    return {
        openItemAccordeonMenu: addListenersAccordeonMenu
      };

  })({
    link: '.accordeon-menu__link'
  });

  menuAccordeon.openItemAccordeonMenu();



/*Accordeon menu end */