import './kit.modal.css';
/**
 * UI Kit Modal v1.1.0
 * Copyright 2017-2019 Andrey Ponomarenko
 * Licensed under  ()
 */

// ======================= MODEL ============================

if	(!document.kit) document.kit = {};
if	(!document.kit.modal) document.kit.modal = {};
let doc = document.documentElement;
window.kit = document.kit;

// == Инициализация ==
//data-modal - айди
//data-trigger - id привязка к модалке

//== Опции ==
// position (string) - fixed/Absolute (На весь экран / в блоке)
// required (true/false) - закрыть модалку можно только по методом hide
// preventDefault (true/false) - будет отменять дефолтное действие по нажатию на триггер (если это напр ссылка)
// fixed ('.string') - внести в список, если элемент в позиции fixed и прижат к правому краю
// storeInstances(true/false/.string) - В каких элементах хранить ссылку на модалку (по дефолту тру, хранит во всех чилдренах модалки)

// == Методы окна ==
// show() - показать окно
// hide() - скрыть окно
// addTrigger(element / '.selector') - добавить триггер
// becomeFixed() - делает окно фиксированным
// becomeAbsolute() - делает окно абсолютным

// == Глобальные методы ==
// createModal - создает модальное окно

// == Коллбеки ==
//onShow(event)
// this - модальное окно
// event - event

//onHide()
// this - модальное окно

//onTrigger(event)
// this - модальное окно
// event - event

// == Полезные параметры ==
// this.id - идентификатор модального окна
// this.modal - элемент модалка
// this.stage - внутреннее окно
//


class KitModal {
	constructor(id) {
		this.id = id;
		this.modal = document.querySelector('[data-modal='+id+']');
		this.stage = document.querySelector('[data-modal='+id+'] .modal_stage');
		this.scrollIsActive = false;
		this.lockKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40];
		this.elementsForScrollPadding = [];

		this.required = false;
		this.preventDefault = false;
		this.lockScroll = true;
		this.absolute = false;
		this.fixed = false;
		this.storeInstances = true;

		//Callbacks
		this.onShow = false;
		this.onHide = false;
		this.onTrigger = false;

		//Animations
		this.stageIn = "fadeInUp";
		this.stageOut = "fadeOutDown";
	}

	show(e) {
		if(!this.modal.kitHasClass("kit_none")) return;
		this.modal.kitRemoveClass("kit_none");
		this.stage.kitAddClass(this.stageIn);
		this.stage.focus();
		this.modal.kitAddClass("kit_active");
		if(this.lockScroll && isScroll()) lockScroll(this);
		if(this.onShow) this.onShow(e);
	}

	hide() {
		if(this.modal.kitHasClass("kit_none")) return;
		this.modal.kitRemoveClass("kit_active");
		this.stage.kitAddClass(this.stageOut);
		if(this.scrollIsActive) releaseScroll(this);
		if(this.onHide) this.onHide();
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
			element.modal = this;
			element.addEventListener('click', (e) => {
				if (this.preventDefault) preventDefault(e);
				if(this.onTrigger) this.onTrigger(e);
				this.show(e);
			});
			element.addEventListener('mousedown', (e) => {
				if (e.button !== 1) return;
				if (this.preventDefault) preventDefault(e);
				if(this.onTrigger) this.onTrigger(e);
				this.show(e);
			});
			element.addEventListener('keydown', (e) => {
				if(e.keyCode !== 32 || e.keyCode !== 13 ) return;
				if (this.preventDefault) preventDefault(e);
				if(this.onTrigger) this.onTrigger(e);
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
	let m;
	document.kit.modal[id] = new KitModal(id);
	m = document.kit.modal[id];
	if(params) Object.assign(m,params);
	m.modal.style.position = m.absolute ? m.becomeAbsolute() : m.becomeFixed();
	if(m.storeInstances) linkInstances(m);
	setElementsForScrollPadding(m);
	m.stage.setAttribute('tabindex',0);
	m.modal.setAttribute('tabindex',0);
	m.modal.kitAddClass('kit_none');
	setListeners(m)
};

function setElementsForScrollPadding(obj) {
	let e = document.querySelectorAll(obj.fixed);
	obj.elementsForScrollPadding.push(doc);
	if(obj.fixed) Object.keys(e).forEach((i) =>
		obj.elementsForScrollPadding.push(e[i]));
}

function linkInstances(obj) {
	let id = obj.id,
	el;
	if(typeof obj.storeInstances === 'string') {
		el = document.querySelectorAll(obj.storeInstances);
	} else if (obj.storeInstances) {
		el = document.querySelectorAll('[data-modal='+id+'] *');
	} else {
		el = false;
	}
	if(el)Object.keys(el).forEach((i) => el[i].modal = document.kit.modal[id]);
}

function setListeners(obj) {
	let triggers = document.querySelectorAll('[data-trigger='+obj.id+']'),
	timer;
	setKeyDownListener(obj.stage,obj);
	setAnimationEndListener(obj.stage, obj);
	Object.keys(triggers).forEach((e) => obj.addTrigger(triggers[e],obj));
	//
	// obj.modal.addEventListener('click', function(e) {
	// 	if(e.target === this && !obj.required) obj.hide();
	// });

	obj.stage.addEventListener('blur', () => {
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
	//important to save width in variable to determinate scroll, before applying 'scroll_hide' to document;
	let width = doc.offsetWidth;
	document.addEventListener('mousewheel', preventDefault);
	document.addEventListener('DOMMouseScroll', preventDefault);
	document.addEventListener('touchmove', preventDefault);
	document.addEventListener('keydown', preventKeys.bind(obj));
	doc.kitAddClass('kit_document-live');
	obj.modal.kitAddClass('kit_modal-live');
	obj.elementsForScrollPadding.forEach((t) =>
		t.style.paddingRight = (obj.modal.offsetWidth - width) + 'px');
	obj.scrollIsActive = true;
}

function releaseScroll(obj) {
	document.removeEventListener('mousewheel', preventDefault);
	document.removeEventListener('DOMMouseScroll', preventDefault);
	document.removeEventListener('touchmove', preventDefault);
	document.removeEventListener('keydown', preventKeys.bind(obj));
	obj.elementsForScrollPadding.forEach((t) =>
		t.style.paddingRight = '');
	doc.kitRemoveClass('kit_document-live');
	obj.modal.kitRemoveClass('kit_modal-live');
	obj.scrollIsActive = false;
}

function preventDefault(e) {
	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

function isScroll() {
	return parseInt(window.getComputedStyle(doc ,null).height) >= window.innerHeight;
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






