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
let teamAccordeon = (function() {

    let linkAccordeon = document.querySelectorAll('.accordeon__link');
    
    let forEachAccordeon = linkAccordeon.forEach(function(personName) {
    personName.addEventListener('click', function(e) {
          e.preventDefault();
          let activePerson = document.querySelector('.accordeon__item.accordeon__item--is-active');
          if(activePerson) {
            let teamAccordeonDetails = activePerson.querySelector('.accordeon-content');
            teamAccordeonDetails.style.height = "";
            activePerson.classList.remove('accordeon__item--is-active');
          }

          if(!activePerson || activePerson.linkAccordeon !== this) {
            let currentPerson = this.closest('.accordeon__item');
            currentPerson.classList.add('accordeon__item--is-active');
            let currentPersonInfo = currentPerson.querySelector('.accordeon-content');
            currentPersonInfo.style.height = currentPersonInfo.scrollHeight + 'px';
          }
        })
    })
  })

teamAccordeon();
/*end Accordeon team */

/* Start accordeon horizontal */
let menuAccordeon = (function() {

    let linkMenuAccordeon = document.querySelectorAll('.accordeon-menu__link');
    let userWidth = window.innerWidth;
    let list = document.querySelector('.accordeon-menu__list');
    let itemsList = list.querySelectorAll('.accordeon-menu__item');
		let titleItem = list.querySelector('.accordeon-menu__link');
		let widthTitle = titleItem.clientWidth;
		var neededWidth = userWidth - itemsList.length * widthTitle;
		neededWidth = (neededWidth > 520) ? '520px' : neededWidth + 'px';
    
    let forEachMenuAccordeon = linkMenuAccordeon.forEach(function(categoryName) {
    categoryName.addEventListener('click', function(e) {
          e.preventDefault();
          let activeCategory = document.querySelector('.accordeon-menu__item.accordeon-menu__item--is-active');
          if(activeCategory) {
            let menuAccordeonDetails = activeCategory.querySelector('.accordeon-menu__item-content');
            menuAccordeonDetails.style.width = "";
            activeCategory.classList.remove('accordeon-menu__item--is-active');
          }

          if(!activeCategory|| activeCategory.linkMenuAccordeon !== this) {
            let currentCategory = this.closest('.accordeon-menu__item');
            currentCategory.classList.add('accordeon-menu__item--is-active');
            let currentCategoryInfo = currentCategory.querySelector('.accordeon-menu__item-content');
            currentCategoryInfo.style.width = neededWidth;
          }
        })
    })
  })

menuAccordeon();

/*End accordeon horinzontal */



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


/* end popup */

/* form*/
const myForm = document.querySelector('#myForm');
const send = document.querySelector('#send');


send.addEventListener('click', event => {
  event.preventDefault();

  const data = {
    name: myForm.elements.name.value,
    phone: myForm.elements.phone.value,
    comment: myForm.elements.comment.value,
    to: "segezmundovna@gmail.com"
  };

  const xhr = new XMLHttpRequest();
  xhr.responseType='json';
  xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
  xhr.send(JSON.stringify(data));
  xhr.addEventListener('load', () => {
    if(xhr.response.status) {
      console.log(xhr.response.status);
    }
  });

});

/*end form */

/* start burger__composition */
let isMobile = () => {
  let screen = document.documentElement.clientWidth;
	let mobile = false;
	if(screen<=768){
    mobile = true;
  } 
	return mobile;
};

let mobileComposition = () => {
		let buttonComposition = document.querySelector('.burger__composition');
		let buttonCloseComposition = document.querySelector('.dropdown__close');

		buttonCloseComposition.addEventListener('click', e => {
			e.preventDefault();

			buttonComposition.classList.remove('active');
		});
		buttonCloseComposition.addEventListener('touchstart', e => {
			e.preventDefault();

			buttonComposition.classList.remove('active');
		});

		if (isMobile) {
			buttonComposition.addEventListener('click', e => {
				buttonComposition.classList.add('active');
			});
		}
		buttonComposition.addEventListener('mouseenter', e => {
			buttonComposition.classList.add('active');
		});

		buttonComposition.addEventListener('mouseleave', e => {
			buttonComposition.classList.remove('active');
		});
	};
	mobileComposition();




/* end burger__composition*/