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
    
    linkAccordeon.forEach(function(personName) {
    personName.addEventListener('click', function(e) {
          e.preventDefault();
          let activePerson = document.querySelector('.accordeon__item.accordeon__item--is-active');
          if(activePerson) {
            let teamAccordeonDetails = activePerson.querySelector('.accordeon-content');
            teamAccordeonDetails.style.maxHeight = "";
            activePerson.classList.remove('accordeon__item--is-active');
          }
					
          if(!activePerson || activePerson.querySelector('.accordeon__link') !== this) {
            let currentPerson = this.closest('.accordeon__item');
            currentPerson.classList.add('accordeon__item--is-active');
            let currentPersonInfo = currentPerson.querySelector('.accordeon-content');
            currentPersonInfo.style.maxHeight = currentPersonInfo.scrollHeight + 'px';
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
            menuAccordeonDetails.style.maxWidth = "";
            activeCategory.classList.remove('accordeon-menu__item--is-active');
          }

          if(!activeCategory|| activeCategory.querySelector('.accordeon-menu__link') !== this) {
            let currentCategory = this.closest('.accordeon-menu__item');
            currentCategory.classList.add('accordeon-menu__item--is-active');
            let currentCategoryInfo = currentCategory.querySelector('.accordeon-menu__item-content');
            currentCategoryInfo.style.maxWidth = neededWidth;
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
    contentText.innerHTML = 'Ошибка отправки данных';
    contentText.innerHTML = text;
    titleItem.innerHTML = title;

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

let formFunction = (function(options) {

  const myForm = document.querySelector('#myForm');
  const send = document.querySelector('#send');
  const data = {
    name: myForm.elements.name.value,
    phone: myForm.elements.phone.value,
    comment: myForm.elements.comment.value,
    to: "segezmundovna@gmail.com"
  };

	let _ajaxInquiry = (function(e){
    e.preventDefault();
		let overlay = document.createElement('div');
		overlay.classList.add('overlay');
		let popupWindow = document.createElement('div');
		popupWindow.classList.add('popup--form');
		let contentText = document.createElement('div');
		contentText.classList.add('popup__content');

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    //xhr.open('GET', 'https://webdev-api.loftschool.com/sendmail/fail'); //для отрицательного ответа
    xhr.open('POST', 'http://test.local/mail.php');   //для положительного ответа
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', () => {
      
      if(xhr.status>=400) {
        let content = 'Ошибка, данные не отправлены, попробуйте позже';
        contentText.innerHTML = content;
      } else {
        if(xhr.response.status) {
          let content = 'Сообщение отправлено';
          contentText.innerHTML = content;
      } else {
          let content = 'Соединение с сервером не установлено';
          contentText.innerHTML = content;
      }
      }
    })
    
		let closeIcon = document.createElement("a");
		closeIcon.classList.add("popup__close-button");
		closeIcon.innerHTML = 'Закрыть';
		closeIcon.href = "#";
		closeIcon.addEventListener("click", (function(e){
			e.preventDefault();
			_closePopup(overlay);
    }));


		overlay.appendChild(popupWindow);
		popupWindow.appendChild(contentText);
		popupWindow.appendChild(closeIcon);
    document.body.appendChild(overlay);
  
	});

	let _closePopup = (function(overlay) {
		document.body.removeChild(overlay);
	});

	let addListeners = (function() {
    send.addEventListener('click', _ajaxInquiry)
	});

	return {
		init: addListeners
	}
});

formFunction({
	text: ".reviews__text"
}).init();


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
		let burgersCompositions = document.querySelectorAll('.burger__composition');
		let buttonsCloseComposition = document.querySelectorAll('.dropdown__close-image');

	for (i=0;i<burgersCompositions.length;i++){
		burgersCompositions[i].addEventListener('mouseenter', e => {
			document.querySelector('.burger__composition').classList.add('active');
		});
		if (isMobile) {
			burgersCompositions[i].addEventListener('click', e => {
				document.querySelector('.burger__composition').classList.add('active');
			});
		}
	}

	for (i=0;i<burgersCompositions.length;i++){
		burgersCompositions[i].addEventListener('mouseleave', e => {
			document.querySelector('.burger__composition').classList.remove('active');
		});
	}


	for (i=0;i<buttonsCloseComposition.length;i++){
			buttonsCloseComposition[i].addEventListener('click', e => {
				e.preventDefault();
				document.querySelector('.burger__composition').classList.remove('active');
			});
		}
	};
	mobileComposition();





/* end burger__composition*/

/* slider*/

let slider = options => {
	let wrapper = document.querySelector(options.wrapper);
	let width = wrapper.clientWidth;
	wrapper.style.width = width  + 'px';
	let step = width;
	let list = document.querySelector(options.list);
	let items = document.querySelectorAll(options.item);

	let left = document.querySelector(options.left);
	let right = document.querySelector(options.right);

	items.forEach(element => {
		element.style.width = width  + 'px';
	});

	let positionMaxRight = width * (items.length - 1);

	let positionRight = 0;

	let _right = position => {
		if (position <= positionMaxRight) {
			positionRight = positionRight + step;
			list.style.right = positionRight + "px";
		}
	};

	let _left = position => {
		if (position >= 0) {
			positionRight = positionRight - step;
			list.style.right = positionRight + "px";
		}
	};

	let initial = () => {
		list.style.right = positionRight;

		right.addEventListener("click", e => {
			e.preventDefault();

			_right(positionRight + step);
		});

		left.addEventListener("click", e => {
			e.preventDefault();

			_left(positionRight - step);
		});

	};

	return {
		init: initial
	}
};

slider({
	wrapper: '.burger__wrapper',
	list: '.burger__list',
	item: '.burger__item',
	right: '.burger__arrows-item--right',
	left: '.burger__arrows-item--left'
}).init();



/*end slider*/


/*start map */
var placemarks = [
	{
		latitude: 59.97, 
		langetude: 30.31,
		hintContent: 'ул. Литераторов, дом 10',
		balloonContent: 'Самые вкусные бургеры у нас!'

	},
	{
		latitude: 59.94, 
		langetude: 30.25,
		hintContent: 'Малый проспект В О, дом 64',
		balloonContent: 'Самые вкусные бургеры у нас!'
	},
	{
		latitude: 59.93, 
		langetude: 30.34,
		hintContent: 'наб. реки Фонтанки, д. 56',
		balloonContent: 'Самые вкусные бургеры у нас!'
	}
];


ymaps.ready(init);

geoObjects = [];

function init() {
	var map = new ymaps.Map('map', {
		center: [59.94, 30.32],
		zoom: 12,
		controls: ['zoomControl'],
		behaviors: ['drag']
	});

	for(var i=0; i < placemarks.length; i++) {
		geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].langetude], 
			{
				hintContent: placemarks[i].hintContent,
				balloonContent: placemarks[i].balloonContent
			},
			{
				iconLayout: 'default#image',
				iconImageHref: 'images/icons/map-marker.svg',
				iconImageSize: [46, 57],
				iconImageOffset: [-23, -57]
			});	
	}

	var clusterer = new ymaps.Clusterer({
		clusterIcons: [
			{
				href: "/images/section-main/burger.png",
				size: [100, 100],
				offset: [-50, -50]
			}
		],
		clusterIconContentLayout: null
	});
	
	map.geoObjects.add(clusterer);
	clusterer.add(geoObjects);
}

/*end map */


/*start OPS */
const sections = $('.section');
const display = $('.content');
const dots = $('.paginator__item');

let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isItMobile = md.mobile();

const performTransition = sectionEq => {
	
	if(inscroll) return;

	inscroll = true;

	sectionEq = parseInt(sectionEq);

	const position = (sectionEq * -100) + '%';


	sections.eq(sectionEq)
		.addClass('active')
		.siblings()
		.removeClass('active');

	dots.eq(sectionEq)
		.addClass('paginator__item--active')
		.siblings()
		.removeClass('paginator__item--active');

	setTimeout(() => {
		inscroll = false;
	}, 1300);
	display.css({
		'transform' : 'translateY(' + (position) + ')'
	});
	
}

const defineSections = sections => {
	const activeSection = sections.filter('.active');
	return {
		activeSection: activeSection,
		nextSection: activeSection.next(),
		prevSection: activeSection.prev()
	}

}

const scrollToSection = direction => {
	const section = defineSections(sections);

	if(direction == 'up' && section.nextSection.length) {
		performTransition(section.nextSection.index());
	}

	if(direction == "down" && section.prevSection.length) {
		performTransition(section.prevSection.index());
	}
}

$('.wrapper').on({
	wheel: e => {
		const deltaY = e.originalEvent.deltaY;
		const direction = (deltaY>0) 
		? 'up' 
		: 'down';
		scrollToSection(direction);
	},
	touchmove: e => (e.preventDefault())
});


/*OPS keyboard */
$(document).on('keydown', e => {

	console.log(e.keyCode);
	switch(e.keyCode) {
		case 40: //up
			scrollToSection('up')
			break;

		case 38: //down
			scrollToSection('down')
			break;
	}

});

$('[data-scroll-to]').on('click', e => {
	e.preventDefault();
	const sectionNum = $(e.currentTarget).attr('data-scroll-to');
	performTransition(sectionNum);
})


/*start mobile ops */
if(isItMobile) {
	$(window).swipe( {
		swipe:function(
			event,
			direction
		) {
			scrollToSection(direction);
		}
	});
}


/*end OPS */


/*start HTML5 video */
let video;
let durationControl; 
let soundControl;
let intervalId;

// документ полностью загружен
$().ready(function(){
    video = document.getElementById("player"); 

    // вешаем обработчик события onclick на тег video
    video.addEventListener('click', playStop);

    // обработчики событий для кнопок play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // обработчик событий для кнопки динамик
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    // обработчики событий для ползунка продолжительности видео
    durationControl = document.getElementById("durationLevel");    
    durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('onmousemove',setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval); 
    durationControl.min = 0;
    durationControl.value = 0;    

    // обработчики событий для ползунка громокости
    soundControl = document.getElementById("micLevel");    
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    // задаем максимальные и минимальные значения громокости
    soundControl.min = 0;
    soundControl.max = 10;
    // присваиваем ползунку максимальное значение
    soundControl.value = soundControl.max;
    
});

/*
 Воспроизведение видео
*/
function playStop(){
    // показывает или скрывает белую кнопку play
    $(".video__player-img").toggleClass("video__player-img--active");
    
    // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
    durationControl.max = video.duration;

    // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
    if (video.paused){
        // запускаем видео
        video.play();
        intervalId = setInterval(updateDuration,1)
        // video.webkitRequestFullScreen(); возможность открыть в полноэкранном режиме
    }else{
        // останавливаем видео
        video.pause();  
        clearInterval(intervalId);
        // document.webkitExitFullscreen(); выйти из полноэкранного режима
    }
}

/*
    Управление звуком
*/
function soundOf(){    
    /*
        Делаем проверку уровня громкости. 
        Если у нас нашего видео есть звук, то мы его выключаем. 
        Предварительно запомнив текущую позицию громкости в переменную soundLevel
    */
    if (video.volume ===0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*10;
    }else{
        /*
            Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
            Хранится в перменной soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

function stopInterval(){
    clearInterval(intervalId);
}

/*
    Реализует возможность перемотки нашего видео
*/
function setVideoDuration(){
    video.currentTime = durationControl.value;   
    intervalId = setInterval(updateDuration,1000/66);    
}

/*
    Управление звуком видео
*/
function changeSoundVolume(){
    /*
        Св-во volume может принимать значения от 0 до 1
        Делим на 10 для того что бы, была возможность более точной регулировки видео. 
    */
    video.volume = soundControl.value/10;  
}

/*
  Функция для обновления позиции ползунка продолжительности видео.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
}
/*end HTML5 video */