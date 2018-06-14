document.kit.modal.createModal('Apple',{
	// required: true,
	preventDefault: true,
	// onShow : showHandler,
	// onHide : hideHandler,
	onTrigger : triggerHandler
})

function showHandler(a, b) {
	console.log(a)
	console.log(b)
}

function hideHandler(a, b) {
	console.log(a)
	console.log(b)
}

function triggerHandler(a, b) {
	console.log(a)
	console.log(b)
}



