/**
 * UI Kit Modal v1.1.0
 * Copyright 2017-2018 Andrey Ponomarenko
 * Licensed under  ()
 */

// ======================= MODEL ============================

if	(!document.kit) document.kit = {};
if	(!document.kit.modal) document.kit.modal = {};
document.kit.modal._modalCounter = 0;

//data-modal - айди
//data-trigger - id привязка к модалке

class KitModal {
	constructor(id) {
		this.id = id;
		this.modal = document.querySelector('[data-modal='+id+']');
		this.stage = document.querySelector('[data-modal='+id+'] .modal_stage');
		this.required = false;
		this.preventDefault = false;
	}

	show() {

	}

	hide() {


	}

	addTrigger () {
	//	Добавить активатор модального окна


	}
}

document.kit.modal.createModal = (id, params) => {
	let triggers = document.querySelectorAll('[data-trigger='+id+']');
	let siblings = 	document.querySelectorAll('[data-modal='+id+'] *');
	document.kit.modal[id] = new KitModal(id);
	let m = document.kit.modal[id];
	if(params) Object.assign(m,params);
	Object.keys(siblings).forEach((i) => siblings[i].modal = m);
	m.stage.setAttribute('tabindex',0);


	for(let i = 0; i < triggers.length; i++) {

	}
};





Element.prototype.kitAddClass = function (classN) {
	if(!this.kitHasClass(classN)) this.className += " " + classN;
	return this;
};

Element.prototype.kitRemoveClass = function (classN) {
	var re = new RegExp('[\\s]{0,1}\\b' + classN + '\\b',"g");
	this.kitHasClass(classN) ? this.className = this.className.replace(re,"") : false;
	return this;
};

Element.prototype.kitHasClass = function (classN) {
	return this.className.indexOf(classN) >= 0;
};






