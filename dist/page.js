document.kit.modal.createModal('Apple',{
	// required: true,
	preventDefault: true,
	// onShow : showHandler,
	// onHide : hideHandler,
	onTrigger : triggerHandler
})

document.kit.modal.createModal('Ex',{
	// required: true,
	preventDefault: true,
	// onShow : showHandler,
	// onHide : hideHandler,
	onTrigger : triggerHandler
})

function close() {
	console.dir(this);
}

function proceed() {
	console.dir(this);
}

function showHandler(a, b) {
	console.log(a)
	console.log(b)
}

function hideHandler(a, b) {
	console.log(a)
	console.log(b)
}

function triggerHandler(modal, event) {
	let btn = document.querySelector('.leave-btn');
	btn.href = event.target.href;
}



