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

/* popup */
let popup = (function(options) {
	let wrapper = document.querySelector('.reviews__list');

	let _tooglePopup = (function(e) {
		e.preventDefault();

		if (e.target.className == options.button) {
			_openPopup(e.target);
		}
	});

	let _openPopup = (function(button){
		let overlay = document.createElement('div');
		overlay.classList.add('overlay');

		let popupWindow = document.createElement('div');
		popupWindow.classList.add('popup');

		let contentText = document.createElement('div');
		contentText.classList.add('popup__content');

		let content = button.parentNode;

		let text = content.querySelector(options.text).textContent;
	 

		let titleItem= document.createElement('div');
		titleItem.classList.add('popup__title');

		let title = content.querySelector(options.title).textContent;
		

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    //xhr.open('GET', 'https://webdev-api.loftschool.com/sendmail/fail'); //для отрицательного ответа
    xhr.open('POST', 'http://test.local/mail.php');   //для положительного ответа
    xhr.send();
    xhr.addEventListener('load', () => {
      
      if(xhr.status>=400) {
          contentText.innerHTML = 'Ошибка отправки данных';
      } else {
        if(xhr.response.status) {
           contentText.innerHTML = text;
           titleItem.innerHTML = title;
          console.log(text);
      }
      }
    })

		let closeIcon = document.createElement("a");
		closeIcon.classList.add("popup__close");
		closeIcon.innerHTML = '<svg class="popup__close-image"><use xlink:href="./images/icons/sprite.svg#close"></use></svg>';
		closeIcon.href = "#";
		closeIcon.addEventListener("click", (function(e){
			e.preventDefault();
			_closePopup(overlay);
		}));

		overlay.appendChild(popupWindow);
		popupWindow.appendChild(titleItem);
		popupWindow.appendChild(contentText);
		popupWindow.appendChild(closeIcon);

		document.body.appendChild(overlay);
	});

	let _closePopup = (function(overlay) {
		document.body.removeChild(overlay);
	});

	let addListeners = (function() {
		wrapper.addEventListener('click', _tooglePopup)
	});

	return {
		init: addListeners
	}
});

popup({
	button: "reviews__button",
	title: ".reviews__title",
	text: ".reviews__text"
}).init();