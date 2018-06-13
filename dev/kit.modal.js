/**
 * UI Kit Modal v1.1.0
 * Copyright 2017-2018 Andrey Ponomarenko
 * Licensed under  ()
 */

// ======================= MODEL ============================

if	(!document.kit) document.kit = {};
if	(!document.kit.modal) document.kit.modal = {};
document.kit.modal._modalCounter = 0;

// == Инициализация ==
//data-modal - айди
//data-trigger - id привязка к модалке

//== Свойства ==
// required - закрыть модалку можно только по кнопке, или кодом
// preventDefault - будет отменять дефолтное действие по нажатию на триггер (если это напр ссылка)

// == Методы ==
// show() - показать окно
// hide() - скрыть окно
// addTrigger() - добавить триггер

// == Коллбеки ==
//onShow
//onHide
//onTrigger

class KitModal {
	constructor(id) {
		this.id = id;
		this.modal = document.querySelector('[data-modal='+id+']');
		this.stage = document.querySelector('[data-modal='+id+'] .modal_stage');
		this.required = false;
		this.preventDefault = false;

		//Callbacks
		this.onShow = false;
		this.onHide = false;
		this.onTrigger = false;

		//Animations
		this.stageIn = "fadeIn";
		this.stageOut = "fadeOut";
	}

	show() {
		if(!this.modal.kitHasClass("kit_none")) return;
		this.modal.kitRemoveClass("kit_none");
		this.stage.kitAddClass(this.stageIn);
		this.stage.focus();
		this.modal.kitAddClass("kit_active");
		// this.preventActions();
		if(this.onShow) this.onShow(this,e);
	}

	hide() {
		if(this.modal.kitHasClass("kit_none")) return;
		this.modal.kitRemoveClass("kit_active");
		this.stage.kitAddClass(this.stageOut);
		// this.letActions();
		if(this.onHide) this.onHide(this);
	}

	setTrigger (element) {
	//	Добавить активатор модального окна



	}
}

document.kit.modal.createModal = (id, params) => {
	let siblings = 	document.querySelectorAll('[data-modal='+id+'] *');
	document.kit.modal[id] = new KitModal(id);
	let m = document.kit.modal[id];
	if(params) Object.assign(m,params);
	Object.keys(siblings).forEach((i) => siblings[i].modal = m);
	m.stage.setAttribute('tabindex',0);
};


// попробовать повесить esc на саму модалу, а не на стейдж
function setListeners(obj) {
	let triggers = document.querySelectorAll('[data-trigger='+id+']'),
	timer;
	setKeyDownListener(obj.stage,obj);
	setAnimationEndListener(obj.stage, obj);
	Object.keys(triggers).forEach((e) => obj.setTrigger(triggers[e]));

	obj.stage.addEventListener('blur', function () {
		timer = setTimeout(() => {
			if(!obj.require) obj.hide()
		},0);
	});
	obj.stage.addEventListener('focus',() => clearTimeout(timer));



}

function setKeyDownListener(element, obj) {
	element.addEventListener('keydown',function (e) {
		let k = e.keyCode;
		if(k === 27 && !obj.required) _this.hide();
	});
}

function setAnimationEndListener(element, obj) {
	element.kitRemoveClass(obj.stageIn);
	element.kitRemoveClass(obj.stageOut);
	if (element.kitHasClass(obj.stageOut)) obj.modal.kitAddClass("kit_none");
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






