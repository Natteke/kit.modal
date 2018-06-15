/**
 * UI Kit Modal v1.1.0
 * Copyright 2017-2019 Andrey Ponomarenko
 * Licensed under  ()
 */

// ======================= MODEL ============================

if	(!document.kit) document.kit = {};
if	(!document.kit.modal) document.kit.modal = {};

// == Инициализация ==
//data-modal - айди
//data-trigger - id привязка к модалке

//== Опции ==
// position - fixed/Absolute (На весь экран / в блоке)
// required - закрыть модалку можно только по методом hide
// preventDefault - будет отменять дефолтное действие по нажатию на триггер (если это напр ссылка)
// sticky - внести в список, если элемент в позиции fixed и прижат к правому краю

// == Методы окна ==
// show() - показать окно
// hide() - скрыть окно
// addTrigger(element / '.selector') - добавить триггер
// becomeFixed() - делает окно фиксированным
// becomeAbsolute() - делает окно абсолютным

// == Глобальные методы ==
// createModal - создает модальное окно
// getActive [создать] - возвращает активное окно

// == Коллбеки ==
//onShow(modalWindow, event)
//onHide(modalWindow)
//onTrigger(modalWindow, event)

// == Полезные параметры ==
// this.id - идентификатор модального окна
// this.modal - элемент модалка
// this.stage - внутреннее окно


// Цель на завтра
// Полный тест


class KitModal {
	constructor(id) {
		this.id = id;
		this.modal = document.querySelector('[data-modal='+id+']');
		this.stage = document.querySelector('[data-modal='+id+'] .modal_stage');
		this.scrollIsActive = false;
		this.lockKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

		this.required = false;
		this.preventDefault = true;
		this.lockScroll = true;
		this.absolute = false;
		this.sticky = [];

		//Callbacks
		this.onShow = false;
		this.onHide = false;
		this.onTrigger = false;

		//Animations
		this.stageIn = "fadeIn";
		this.stageOut = "fadeOut";
	}

	show(e) {
		if(!this.modal.kitHasClass("kit_none")) return;
		this.modal.kitRemoveClass("kit_none");
		this.stage.kitAddClass(this.stageIn);
		this.stage.focus();
		this.modal.kitAddClass("kit_active");
		if(this.lockScroll && isScroll()) lockScroll(this);
		if(this.onShow) this.onShow(this, e);
	}

	hide() {
		if(this.modal.kitHasClass("kit_none")) return;
		this.modal.kitRemoveClass("kit_active");
		this.stage.kitAddClass(this.stageOut);
		if(this.scrollIsActive) releaseScroll(this);
		if(this.onHide) this.onHide(this);
	}

	becomeFixed() {
		this.modal.style.position = 'fixed';

	}

	becomeAbsolute() {
		this.modal.style.position = 'absolute';
		this.modal.parentElement.kitAddClass('kit_relative');
	}

	addTrigger (input) {
		let set = (element) => {
			element.addEventListener('click', (e) => {
				if (this.preventDefault) preventDefault(e);
				if(this.onTrigger) this.onTrigger(this, e);
				this.show(e);
			});
			element.addEventListener('mousedown', (e) => {
				if (e.button !== 1) return;
				if (this.preventDefault) preventDefault(e);
				if(this.onTrigger) this.onTrigger(this, e);
				this.show(e);
			});
			element.addEventListener('keydown', (e) => {
				if(e.keyCode !== 32 || e.keyCode !== 13 ) return;
				if (this.preventDefault) preventDefault(e);
				if(this.onTrigger) this.onTrigger(this, e);
				this.show(e);
			});
		};
		switch (typeof input) {
			case 'object':
				set(input);
				break;
			case 'string':
				let o = document.querySelectorAll(input);
				Object.keys(o).forEach((e) => set(o[e]));
				break;
			default:
				console.error('[KitModal] addTrigger takes ".selector" or an element object')
		}
		return this;
	}
}

document.kit.modal.createModal = (id, params) => {
	let m, siblings;
	siblings = 	document.querySelectorAll('[data-modal='+id+'] *');
	document.kit.modal[id] = new KitModal(id);
	m = document.kit.modal[id];
	if(params) Object.assign(m,params);
	m.modal.style.position = m.absolute ? m.becomeAbsolute() : m.becomeFixed();
	Object.keys(siblings).forEach((i) => siblings[i].modal = m);
	m.stage.setAttribute('tabindex',0);
	setListeners(m)
};

function setListeners(obj) {
	let triggers = document.querySelectorAll('[data-trigger='+obj.id+']'),
	timer;
	setKeyDownListener(obj.stage,obj);
	setAnimationEndListener(obj.stage, obj);
	Object.keys(triggers).forEach((e) => obj.addTrigger(triggers[e],obj));

	obj.stage.addEventListener('blur', function () {
		timer = setTimeout(() => {
			if(!obj.required) obj.hide();
		},0);
	},true);
	obj.stage.addEventListener('focus',(() => clearTimeout(timer)), true);
}

function setKeyDownListener(element, obj) {
	element.addEventListener('keydown',function (e) {
		let k = e.keyCode;
		if(k === 27 && !obj.required) obj.hide();
	});
}

function setAnimationEndListener(element, obj) {
	element.addEventListener('animationend', function () {
		element.kitRemoveClass(obj.stageIn);
		if (element.kitHasClass(obj.stageOut)) {
			element.kitRemoveClass(obj.stageOut);
			obj.modal.kitAddClass("kit_none");
		}
	});
}

function lockScroll (obj) {
	document.addEventListener('mousewheel', preventDefault);
	document.addEventListener('DOMMouseScroll', preventDefault);
	document.addEventListener('touchmove', preventDefault);
	document.addEventListener('keydown', preventKeys.bind(obj));
	document.documentElement.kitAddClass('html_scroll_hide');
	obj.modal.kitAddClass('kit_dis_touch');
	obj.modal.kitAddClass('modal_scroll');
	obj.sticky.forEach((t) => t.style.paddingRight = (obj.modal.offsetWidth - doc.offsetWidth) + 'px');
	obj.scrollIsActive = true;
}

function releaseScroll(obj) {
	document.removeEventListener('mousewheel', preventDefault);
	document.removeEventListener('DOMMouseScroll', preventDefault);
	document.removeEventListener('touchmove', preventDefault);
	document.removeEventListener('keydown', preventKeys.bind(obj));
	obj.sticky.forEach((t) => t.style.paddingRight = 'inherit');
	document.documentElement.kitRemoveClass('html_scroll_hide');
	obj.modal.kitRemoveClass('modal_scroll');
	obj.modal.kitRemoveClass('kit_dis_touch');

	obj.scrollIsActive = false;
}

function preventDefault(e) {
	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

function isScroll() {
	return parseInt(window.getComputedStyle(document.documentElement ,null).height) >= window.innerHeight;
}
function preventKeys (e) {
	if(this.lockKeys.indexOf(e.keyCode) >= 0) {
		preventDefault(e);
	}
}

Element.prototype.kitAddClass = function (classN) {
	if(!this.kitHasClass(classN)) this.className += " " + classN;
	return this;
};

Element.prototype.kitRemoveClass = function (classN) {
	this.kitHasClass(classN) ? this.className = this.className.replace(new RegExp('[\\s]{0,1}\\b' + classN + '\\b',"g"),"") : false;
	return this;
};

Element.prototype.kitHasClass = function (classN) {
	return this.className.indexOf(classN) >= 0;
};






