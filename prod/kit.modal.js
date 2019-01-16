!function (e) {
	var t = {};

	function n(o) {
		if (t[o]) return t[o].exports;
		var i = t[o] = {i: o, l: !1, exports: {}};
		return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
	}

	n.m = e, n.c = t, n.d = function (e, t, o) {
		n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: o})
	}, n.r = function (e) {
		"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
	}, n.t = function (e, t) {
		if (1 & t && (e = n(e)), 8 & t) return e;
		if (4 & t && "object" == typeof e && e && e.__esModule) return e;
		var o = Object.create(null);
		if (n.r(o), Object.defineProperty(o, "default", {
			enumerable: !0,
			value: e
		}), 2 & t && "string" != typeof e) for (var i in e) n.d(o, i, function (t) {
			return e[t]
		}.bind(null, i));
		return o
	}, n.n = function (e) {
		var t = e && e.__esModule ? function () {
			return e.default
		} : function () {
			return e
		};
		return n.d(t, "a", t), t
	}, n.o = function (e, t) {
		return Object.prototype.hasOwnProperty.call(e, t)
	}, n.p = "/Users/andrejponomarenko/Projects/kit.modal/prod/", n(n.s = 2)
}([, function (e, t, n) {
}, function (e, t, n) {
	"use strict";
	var o = Object.assign || function (e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o])
		}
		return e
	}, i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
		return typeof e
	} : function (e) {
		return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
	}, r = function () {
		function e(e, t) {
			for (var n = 0; n < t.length; n++) {
				var o = t[n];
				o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
			}
		}

		return function (t, n, o) {
			return n && e(t.prototype, n), o && e(t, o), t
		}
	}();
	n(1), document.kit || (document.kit = {}), document.kit.modal || (document.kit.modal = {});
	var s = document.documentElement;
	window.kit = document.kit;
	var a = function () {
		function e(t) {
			!function (e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			}(this, e), this.id = t, this.modal = document.querySelector("[data-modal=" + t + "]"), this.stage = document.querySelector("[data-modal=" + t + "] .modal_stage"), this.scrollIsActive = !1, this.lockKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40], this.elementsForScrollPadding = [], this.required = !1, this.preventDefault = !1, this.lockScroll = !0, this.absolute = !1, this.fixed = !1, this.storeInstances = !0, this.onShow = !1, this.onHide = !1, this.onTrigger = !1, this.stageIn = "fadeInUp", this.stageOut = "fadeOutDown"
		}

		return r(e, [{
			key: "show", value: function (e) {
				var t, n;
				this.modal.kitHasClass("kit_none") && (this.modal.kitRemoveClass("kit_none"), this.stage.kitAddClass(this.stageIn), this.stage.focus(), this.modal.kitAddClass("kit_active"), this.lockScroll && parseInt(window.getComputedStyle(s, null).height) >= window.innerHeight && (t = this, n = s.offsetWidth, document.addEventListener("touchmove", l, {passive: !1}), document.addEventListener("gesturechange", l), document.addEventListener("keydown", d.bind(t)), s.kitAddClass("kit_document-live"), t.modal.kitAddClass("kit_modal-live"), t.elementsForScrollPadding.forEach(function (e) {
					return e.style.paddingRight = t.modal.offsetWidth - n + "px"
				}), t.scrollIsActive = !0), this.onShow && this.onShow(e))
			}
		}, {
			key: "hide", value: function () {
				var e;
				this.modal.kitHasClass("kit_none") || (this.modal.kitRemoveClass("kit_active"), this.stage.kitAddClass(this.stageOut), this.scrollIsActive && (e = this, document.removeEventListener("touchmove", l, {passive: !1}), document.removeEventListener("gesturechange", l), document.removeEventListener("keydown", d.bind(e)), e.elementsForScrollPadding.forEach(function (e) {
					return e.style.paddingRight = ""
				}), s.kitRemoveClass("kit_document-live"), e.modal.kitRemoveClass("kit_modal-live"), e.scrollIsActive = !1), this.onHide && this.onHide())
			}
		}, {
			key: "becomeFixed", value: function () {
				this.modal.style.position = "fixed"
			}
		}, {
			key: "becomeAbsolute", value: function () {
				this.modal.style.position = "absolute", this.modal.parentElement.kitAddClass("kit_relative")
			}
		}, {
			key: "addTrigger", value: function (e) {
				var t = this, n = function (e) {
					e.modal = t, e.addEventListener("click", function (e) {
						t.preventDefault && l(e), t.onTrigger && t.onTrigger(e), t.show(e)
					}), e.addEventListener("mousedown", function (e) {
						1 === e.button && (t.preventDefault && l(e), t.onTrigger && t.onTrigger(e), t.show(e))
					}), e.addEventListener("keydown", function (e) {
						32 === e.keyCode && 13 === e.keyCode && (t.preventDefault && l(e), t.onTrigger && t.onTrigger(e), t.show(e))
					})
				};
				switch (void 0 === e ? "undefined" : i(e)) {
					case"object":
						n(e);
						break;
					case"string":
						var o = document.querySelectorAll(e);
						Object.keys(o).forEach(function (e) {
							return n(o[e])
						});
						break;
					default:
						console.error('[KitModal] addTrigger takes ".selector" or an element object')
				}
				return this
			}
		}]), e
	}();

	function l(e) {
		e.preventDefault ? e.preventDefault() : e.returnValue = !1
	}

	function d(e) {
		this.lockKeys.indexOf(e.keyCode) >= 0 && l(e)
	}

	document.kit.modal.createModal = function (e, t) {
		var n, i, r = void 0;
		document.kit.modal[e] = new a(e), r = document.kit.modal[e], t && o(r, t), r.modal.style.position = r.absolute ? r.becomeAbsolute() : r.becomeFixed(), r.storeInstances && function (e) {
			var t = e.id, n = void 0;
			n = "string" == typeof e.storeInstances ? document.querySelectorAll(e.storeInstances) : !!e.storeInstances && document.querySelectorAll("[data-modal=" + t + "] *");
			n && Object.keys(n).forEach(function (e) {
				return n[e].modal = document.kit.modal[t]
			})
		}(r), n = r, i = document.querySelectorAll(n.fixed), n.elementsForScrollPadding.push(s), n.fixed && Object.keys(i).forEach(function (e) {
			return n.elementsForScrollPadding.push(i[e])
		}), r.stage.setAttribute("tabindex", 0), r.modal.setAttribute("tabindex", 0), r.modal.kitAddClass("kit_none"), function (e) {
			var t = document.querySelectorAll("[data-trigger=" + e.id + "]"), n = void 0;
			(function (e, t) {
				e.addEventListener("keydown", function (e) {
					var n = e.keyCode;
					27 !== n || t.required || t.hide()
				})
			})(e.stage, e), function (e, t) {
				e.addEventListener("animationend", function () {
					e.kitRemoveClass(t.stageIn), e.kitHasClass(t.stageOut) && (e.kitRemoveClass(t.stageOut), t.modal.kitAddClass("kit_none"))
				})
			}(e.stage, e), Object.keys(t).forEach(function (n) {
				return e.addTrigger(t[n], e)
			}), e.stage.addEventListener("blur", function () {
				n = setTimeout(function () {
					e.required || e.hide()
				}, 0)
			}, !0), e.stage.addEventListener("focus", function () {
				return clearTimeout(n)
			}, !0)
		}(r)
	}, Element.prototype.kitAddClass = function (e) {
		return this.kitHasClass(e) || (this.className += " " + e), this
	}, Element.prototype.kitRemoveClass = function (e) {
		return this.kitHasClass(e) && (this.className = this.className.replace(new RegExp("[\\s]{0,1}\\b" + e + "\\b", "g"), "")), this
	}, Element.prototype.kitHasClass = function (e) {
		return this.className.indexOf(e) >= 0
	}
}]);