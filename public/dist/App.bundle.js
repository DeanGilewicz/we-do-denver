/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};

exports.$ = $;
exports.$$ = $$;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _card = __webpack_require__(3);

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import axios from 'axios';

var domReady = function domReady(callback) {
	"use strict";

	if (document.readyState === "interactive" || document.readyState === "complete") {
		callback();
	} else {
		document.addEventListener("DOMContentLoaded", callback);
	}
};

domReady(function () {
	"use strict";

	if (document.querySelector('#img')) {

		var readURL = function readURL(input) {
			if (input.files && input.files[0]) {
				var imgPreviewContainer = document.querySelector('.form__image--container');
				var imgPreviewEl = document.querySelector('.image__preview');
				var reader = new FileReader();

				reader.onload = function (e) {
					imgPreviewEl.setAttribute('src', e.target.result);
					imgPreviewContainer.style.display = 'block';
				};

				reader.readAsDataURL(input.files[0]);
			}
		};

		var fileUploadInput = document.querySelector('#img');

		fileUploadInput.on('change', function (e) {
			readURL(this);
		});
	}

	if (document.querySelector('#img-update')) {

		var currentImage = document.querySelector('#current-image');
		var imgPreviewEl = document.querySelector('.image__preview');
		var _fileUploadInput = document.querySelector('#img-update');
		var imageChangeCancel = document.querySelector('#image-cancel');
		var editImageTrigger = document.querySelector('[data-trigger="image"]');
		var changeImageTrigger = document.querySelector('.form__input--image-wrapper');

		var _readURL = function _readURL(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					imgPreviewEl.setAttribute('src', e.target.result);
					currentImage.style.display = 'none';
				};
				reader.readAsDataURL(input.files[0]);
			}
		};

		_fileUploadInput.on('change', function (e) {
			_readURL(this);
		});

		imageChangeCancel.addEventListener('click', function () {
			_fileUploadInput.value = '';
			changeImageTrigger.style.display = 'none';
			imgPreviewEl.setAttribute('src', '');
			currentImage.style.display = 'block';
		});

		editImageTrigger.addEventListener('click', function () {
			imgPreviewEl.setAttribute('src', '');
			currentImage.style.display = 'none';
			changeImageTrigger.style.display = 'block';
		});
	}

	// dropdown sort category
	if (document.querySelector('#js-sort-category')) {

		var getQueryStringParams = function getQueryStringParams(query) {
			return query ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function (params, param) {
				var _param$split = param.split('='),
				    _param$split2 = _slicedToArray(_param$split, 2),
				    key = _param$split2[0],
				    value = _param$split2[1];

				params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
				return params;
			}, {}) : {};
		};

		// check if query params exist in url
		var queryParams = getQueryStringParams(window.location.search);
		var dropdownValue = void 0;
		if (Object.keys(queryParams).length !== 0 && queryParams.constructor === Object) {
			// construct the value for drop down so can sync value between dropdown and url
			dropdownValue = queryParams.q + '-' + queryParams.s;
		}

		// ref to select element
		var sortEl = document.querySelector('#js-sort-category select');

		// if query params then sync dropdown
		if (dropdownValue) {
			sortEl.value = dropdownValue;
		}

		// add event for sorting
		sortEl.addEventListener('change', function () {
			var categorySlug = window.location.pathname.split('/')[2];
			if (this.value !== "") {
				var valueSplit = ("" + this.value).split('-');
				var sortValue = valueSplit[0];
				var sortOrder = valueSplit[1];
				window.location.href = "/categories/" + categorySlug + "?q=" + sortValue + "&s=" + sortOrder;
			} else {
				window.location.href = "/categories/" + categorySlug;
			}
		});
	}

	// dropdown sort places
	if (document.querySelector('#js-sort-places')) {

		var _getQueryStringParams = function _getQueryStringParams(query) {
			return query ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function (params, param) {
				var _param$split3 = param.split('='),
				    _param$split4 = _slicedToArray(_param$split3, 2),
				    key = _param$split4[0],
				    value = _param$split4[1];

				params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
				return params;
			}, {}) : {};
		};

		// check if query params exist in url
		var _queryParams = _getQueryStringParams(window.location.search);
		var _dropdownValue = void 0;
		if (Object.keys(_queryParams).length !== 0 && _queryParams.constructor === Object) {
			// construct the value for drop down so can sync value between dropdown and url
			_dropdownValue = _queryParams.q + '-' + _queryParams.s;
		}

		// ref to select element
		var _sortEl = document.querySelector('#js-sort-places select');

		// if query params then sync dropdown
		if (_dropdownValue) {
			_sortEl.value = _dropdownValue;
		}

		// add event for sorting
		_sortEl.addEventListener('change', function () {
			if (this.value !== "") {
				var valueSplit = ("" + this.value).split('-');
				var sortValue = valueSplit[0];
				var sortOrder = valueSplit[1];
				window.location.href = "/places?q=" + sortValue + "&s=" + sortOrder;
			} else {
				window.location.href = '/places';
			}
		});
	}

	// dropdown sort visits
	if (document.querySelector('#js-sort-visits')) {

		var _getQueryStringParams2 = function _getQueryStringParams2(query) {
			return query ? (/^[?#]/.test(query) ? query.slice(1) : query).split('&').reduce(function (params, param) {
				var _param$split5 = param.split('='),
				    _param$split6 = _slicedToArray(_param$split5, 2),
				    key = _param$split6[0],
				    value = _param$split6[1];

				params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
				return params;
			}, {}) : {};
		};

		// get place id since dynamic in url 
		var placeId = window.location.pathname.split('/')[2];
		// .filter(item => item !== "" && item !== 'place' && item !== 'visits');

		// check if query params exist in url
		var _queryParams2 = _getQueryStringParams2(window.location.search);
		var _dropdownValue2 = void 0;
		if (Object.keys(_queryParams2).length !== 0 && _queryParams2.constructor === Object) {
			// construct the value for drop down so can sync value between dropdown and url
			_dropdownValue2 = _queryParams2.q + '-' + _queryParams2.s;
		}

		// ref to select element
		var _sortEl2 = document.querySelector('#js-sort-visits select');

		// if query params then sync dropdown
		if (_dropdownValue2) {
			_sortEl2.value = _dropdownValue2;
		}

		// add event for sorting
		_sortEl2.addEventListener('change', function () {
			if (this.value !== "") {
				var valueSplit = ("" + this.value).split('-');
				var sortValue = valueSplit[0];
				var sortOrder = valueSplit[1];
				window.location.href = "/place/" + placeId + "/visits?q=" + sortValue + "&s=" + sortOrder;
			} else {
				window.location.href = "/place/" + placeId + "/visits";
			}
		});
	}

	if (document.querySelector('#js-card')) {

		var urlArr = window.location.pathname.split('/');
		var urlId = urlArr[urlArr.length - 1]; // need to grab id to use when posting data (record that is being modified / deleted)

		var imageOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="image"]'),
			cancel: document.querySelector('[data-cancel="image"]'),
			save: document.querySelector('[data-save="image"]'),
			inputs: document.querySelectorAll('[data-input="image"]'),
			endpointUrl: "/place/" + urlId + "/update-place",
			redirectUrl: "/place/" + urlId,
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		var nameOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="name"]'),
			cancel: document.querySelector('[data-cancel="name"]'),
			save: document.querySelector('[data-save="name"]'),
			inputs: document.querySelectorAll('[data-input="name"]'),
			endpointUrl: "/place/" + urlId + "/update-place",
			redirectUrl: "/place/" + urlId,
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		var addressOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="address"]'),
			cancel: document.querySelector('[data-cancel="address"]'),
			save: document.querySelector('[data-save="address"]'),
			inputs: document.querySelectorAll('[data-input="address"]'),
			multiInputContainer: document.querySelector('#address__container'),
			endpointUrl: "/place/" + urlId + "/update-place",
			redirectUrl: "/place/" + urlId,
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		var tagsOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="tag"]'),
			cancel: document.querySelector('[data-cancel="tag"]'),
			save: document.querySelector('[data-save="tag"]'),
			inputs: document.querySelectorAll('[data-input="tag"]'),
			multiInputContainer: document.querySelector('#tag__container'),
			deleteEl: document.querySelector('[data-delete="tag"]'),
			addEl: document.querySelector('[data-add="tag"]'),
			endpointUrl: "/place/" + urlId + "/update-place",
			redirectUrl: "/place/" + urlId,
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		var cardActionsImage = new _card2.default(imageOptions);
		var cardActionsName = new _card2.default(nameOptions);
		var cardActionsAddress = new _card2.default(addressOptions);
		var cardActionsTags = new _card2.default(tagsOptions);
	}
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardActions = function () {
	function CardActions() {
		var _this = this;

		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    card = _ref.card,
		    trigger = _ref.trigger,
		    cancel = _ref.cancel,
		    save = _ref.save,
		    _ref$inputs = _ref.inputs,
		    inputs = _ref$inputs === undefined ? [] : _ref$inputs,
		    _ref$multiInputContai = _ref.multiInputContainer,
		    multiInputContainer = _ref$multiInputContai === undefined ? undefined : _ref$multiInputContai,
		    _ref$deleteEl = _ref.deleteEl,
		    deleteEl = _ref$deleteEl === undefined ? undefined : _ref$deleteEl,
		    _ref$addEl = _ref.addEl,
		    addEl = _ref$addEl === undefined ? undefined : _ref$addEl,
		    endpointUrl = _ref.endpointUrl,
		    redirectUrl = _ref.redirectUrl,
		    response = _ref.response,
		    responseMessage = _ref.responseMessage;

		_classCallCheck(this, CardActions);

		/* constants */

		// component itself
		this.card = card;

		// inputs container
		this.multiInputContainer = multiInputContainer;

		// current state of inputs
		this.formInputs = inputs;

		// action elements
		this.trigger = trigger;
		this.cancel = cancel;
		this.save = save;
		this.deleteInput = deleteEl;
		this.addInput = addEl;

		// handle persist data
		this.endpointUrl = endpointUrl;
		this.redirectUrl = redirectUrl;
		this.response = response;
		this.responseMessage = responseMessage;

		/* dynamic - SPA ui */

		// copy of intial inputs - for rolling back - base reference once manipulate DOM - not modified 
		this.rollback = [].concat(_toConsumableArray(this.formInputs)).map(function (input) {
			return input.cloneNode(true);
		});

		// current input index
		this.inputIndex = 0;

		/* events */

		var wrapperElId = this.card.getAttribute('id');
		var triggerElAttr = this.trigger.getAttribute('data-trigger');
		var cancelElAttr = this.cancel.getAttribute('data-cancel');
		var saveElAttr = this.save.getAttribute('data-save');

		// set ref to data name for DOM els
		this.attrValue = triggerElAttr;
		// console.log('attrvalue', this.attrValue);

		// set up focus event on container of mulitple inputs to keep track of last selected input
		if (this.formInputs.length > 0 && typeof multiInputContainer !== 'undefined') {
			this.multiInputContainer.addEventListener('focus', function (e) {
				var elIndex = e.target.name.split('-')[1];
				_this.inputIndex = parseInt(elIndex, 0);
			}, true);
		}
		// trigger
		this._eventDelegate('#' + wrapperElId, 'click', '[data-trigger=' + this.attrValue + ']', function (e) {
			_this._hideTrigger();
			_this._showCancel();
			_this._showSave();
			_this._showDelete();
			_this._showAdd();
			_this._enableInput();
		});
		// cancel
		this._eventDelegate('#' + wrapperElId, 'click', '[data-cancel=' + this.attrValue + ']', function (e) {
			_this._resetInputValue();
			_this._disableInput();
			_this._hideCancel();
			_this._hideSave();
			_this._hideDelete();
			_this._hideAdd();
			_this._showTrigger();
			_this.responseMessage.textContent = "";
			_this.response.classList.remove('ajax__response--error');
		});
		// save
		this._eventDelegate('#' + wrapperElId, 'click', '[data-save=' + this.attrValue + ']', function (e) {
			_this._saveInputValue();
		});
		// delete
		if (typeof this.deleteInput !== 'undefined') {
			var deleteElAttr = this.deleteInput.getAttribute('data-delete');
			this._eventDelegate('#' + wrapperElId, 'click', '[data-delete=' + this.attrValue + ']', function (e) {
				_this._deleteInput();
			});
		}
		// add
		if (typeof this.addInput !== 'undefined') {
			var addElAttr = this.addInput.getAttribute('data-add');
			this._eventDelegate('#' + wrapperElId, 'click', '[data-add=' + this.attrValue + ']', function (e) {
				_this._addInput();
			});
		}
	}

	_createClass(CardActions, [{
		key: '_hideTrigger',
		value: function _hideTrigger() {
			this.trigger.classList.add('hide');
		}
	}, {
		key: '_showTrigger',
		value: function _showTrigger() {
			this.trigger.classList.remove('hide');
		}
	}, {
		key: '_hideCancel',
		value: function _hideCancel() {
			this.cancel.classList.remove('active');
		}
	}, {
		key: '_showCancel',
		value: function _showCancel() {
			this.cancel.classList.add('active');
		}
	}, {
		key: '_hideSave',
		value: function _hideSave() {
			this.save.classList.remove('active');
		}
	}, {
		key: '_showSave',
		value: function _showSave() {
			this.save.classList.add('active');
		}
	}, {
		key: '_hideDelete',
		value: function _hideDelete() {
			if (typeof this.deleteInput !== 'undefined') {
				this.deleteInput.classList.remove('active');
			}
		}
	}, {
		key: '_showDelete',
		value: function _showDelete() {
			if (typeof this.deleteInput !== 'undefined') {
				this.deleteInput.classList.add('active');
			}
		}
	}, {
		key: '_hideAdd',
		value: function _hideAdd() {
			if (typeof this.addInput !== 'undefined') {
				this.addInput.classList.remove('active');
			}
		}
	}, {
		key: '_showAdd',
		value: function _showAdd() {
			if (typeof this.addInput !== 'undefined') {
				this.addInput.classList.add('active');
			}
		}
	}, {
		key: '_deleteInput',
		value: function _deleteInput() {
			var _this2 = this;

			/* delete tag that was in focus */

			// convert to array
			var inputsArray = Array.from(this.formInputs);
			var inputsStart = inputsArray.slice(0, this.inputIndex);
			var inputsEnd = inputsArray.slice(this.inputIndex + 1, this.formInputs.length);

			// merge start and end without deleted el
			var updatedArray = [].concat(_toConsumableArray(inputsStart), _toConsumableArray(inputsEnd));

			// update reference for formInputs
			this.formInputs = updatedArray;

			// set up dom
			var domInputsHtml = updatedArray.map(function (el, i) {
				return '<input class="form__input form__input--' + _this2.attrValue + '" name="' + _this2.attrValue + '-' + i + '" value="' + el.value + '" data-input="' + _this2.attrValue + '" />';
			});

			// update DOM
			this.multiInputContainer.innerHTML = domInputsHtml.join('');
		}
	}, {
		key: '_addInput',
		value: function _addInput() {
			var _this3 = this;

			// create DOM node
			var additionalInput = document.createElement('input');
			additionalInput.classList.add("form__input", 'form__input--' + this.attrValue);
			additionalInput.setAttribute('name', this.attrValue + '-' + this.formInputs.length);
			additionalInput.setAttribute('value', "");
			additionalInput.setAttribute('data-input', '' + this.attrValue);

			var updatedArray = [].concat(_toConsumableArray(this.formInputs), [additionalInput]);
			// console.log(this.formInputs);
			// console.log(additionalInput);
			// console.log(updatedArray);

			// update reference for formInputs
			// this.formInputs = updatedArray;

			// set up dom
			var domInputsHtml = updatedArray.map(function (el, i) {
				return '<input class="form__input form__input--' + _this3.attrValue + '" name="' + _this3.attrValue + '-' + i + '" value="' + el.value + '" data-input="' + _this3.attrValue + '" />';
			});

			// update DOM
			this.multiInputContainer.innerHTML = domInputsHtml.join('');

			// get reference to dom elements
			this.formInputs = this.multiInputContainer.querySelectorAll('[data-input="' + this.attrValue + '"]');
			// focus in last input
			this.formInputs[this.formInputs.length - 1].focus();
		}
	}, {
		key: '_disableInput',
		value: function _disableInput() {
			if (this.formInputs.length > 0) {
				this.formInputs.forEach(function (formInput) {
					formInput.setAttribute('disabled', 'disabled');
					formInput.blur();
				});
			}
		}
	}, {
		key: '_enableInput',
		value: function _enableInput() {
			var _this4 = this;

			if (this.formInputs.length > 0 && typeof this.multiInputContainer !== 'undefined') {
				// get reference to newly added DOM elements
				this.formInputs = this.multiInputContainer.querySelectorAll('[data-input="' + this.attrValue + '"]');
			}

			if (this.formInputs.length > 0) {
				this.formInputs.forEach(function (formInput, i) {
					formInput.removeAttribute('disabled');
					if (i === 0) {
						formInput.focus();
						_this4._moveCursorToEnd(formInput);
					}
				});
			}
		}
	}, {
		key: '_resetInputValue',
		value: function _resetInputValue() {
			var _this5 = this;

			if (this.formInputs.length > 0 && typeof this.multiInputContainer !== 'undefined') {
				// reset to initial elements
				this.formInputs = this.rollback;
				// update DOM
				this.multiInputContainer.innerHTML = this.formInputs.map(function (el, i) {
					return '<input class="form__input form__input--' + _this5.attrValue + '" name="' + _this5.attrValue + '-' + i + '" value="' + el.value + '" data-input="' + _this5.attrValue + '" disabled />';
				}).join('');
			} else if (this.formInputs.length > 0) {
				// reset value
				this.formInputs.forEach(function (formInput, i) {
					formInput.value = _this5.rollback[i].value;
				});
			}
		}
	}, {
		key: '_saveInputValue',
		value: function _saveInputValue() {
			var _this6 = this;

			// reset reference to keep state in sync
			// this.formInputs.length = 0;
			// this.formInputs = [];
			if (this.formInputs.length > 0) {
				var data = {};
				this.formInputs.forEach(function (formInput) {
					// handle tags differently since data structure is { tags: ['this','is','it'] }
					if (formInput.name.indexOf('tag') > -1) {
						if (typeof data.tags === 'undefined') {
							// create a tags property as an array if doesn't already exist
							data.tags = [];
							data.tags.push(formInput.value);
						} else {
							data.tags.push(formInput.value);
						}
					} else {
						data[formInput.name] = formInput.value;
					}
				});
				// console.log('DATA', data);
				this._ajaxPost('POST', this.endpointUrl, data).then(function (res) {
					console.log('res', res);
					// this.responseMessage.textContent = "Update successful!";
					// this.response.classList.add('ajax__response--success');
					// const uiTimeOut = setTimeout( () => {
					// 	this.response.classList.remove('ajax__response--success');
					// 	this.responseMessage.textContent = "";
					// 	window.clearTimeout(uiTimeOut);
					if (_this6.redirectUrl) {
						window.location.href = _this6.redirectUrl;
					}
					// }, 1000);
				}).catch(function (err) {
					console.error('err', err);
					_this6.responseMessage.textContent = "Unable to update. Please try again.";
					_this6.response.classList.add('ajax__response--error');
					var uiTimeOut = setTimeout(function () {
						_this6.response.classList.remove('ajax__response--error');
						_this6.responseMessage.textContent = "";
						window.clearTimeout(uiTimeOut);
					}, 1000);
				});
			}
		}
	}, {
		key: '_eventDelegate',
		value: function _eventDelegate(elSelector, eventName, selector, fn) {
			var element = document.querySelector(elSelector);
			// console.log(element);
			// console.log(eventName);
			// console.log(selector);
			element.addEventListener(eventName, function (event) {
				var possibleTargets = element.querySelectorAll(selector);
				// console.log(possibleTargets);
				var target = event.target;
				for (var i = 0, l = possibleTargets.length; i < l; i++) {
					var el = target;
					var p = possibleTargets[i];

					while (el && el !== element) {
						if (el === p) {
							return fn.call(p, event);
						}
						el = el.parentNode;
					}
				}
			});
		}
	}, {
		key: '_moveCursorToEnd',
		value: function _moveCursorToEnd(input) {
			// If this function exists... (IE 9+)
			if (input.setSelectionRange) {
				// Double the length because Opera is inconsistent about whether a carriage return is one character or two.
				var len = input.value.length * 2;
				// Timeout seems to be required for Blink
				setTimeout(function () {
					input.setSelectionRange(len, len);
				}, 1);
			} else {
				// As a fallback, replace the contents with itself
				// Doesn't work in Chrome, but Chrome supports setSelectionRange
				input.value(input.value());
			}
		}
	}, {
		key: '_ajaxPost',
		value: function _ajaxPost(methodType, url, data) {
			var promiseObj = new Promise(function (resolve, reject) {
				var xhr = new XMLHttpRequest();
				xhr.open(methodType, url, true);
				xhr.setRequestHeader('Content-Type', 'application/json');
				xhr.send(JSON.stringify(data));
				xhr.onreadystatechange = function () {
					if (xhr.readyState === 4) {
						if (xhr.status === 200) {
							console.log("xhr done successfully");
							var resp = xhr.responseText;
							var respJson = JSON.parse(resp);
							resolve(respJson);
						} else {
							reject(xhr.status);
							console.log("xhr failed");
						}
					} else {
						console.log("xhr processing going on");
					}
				};
				console.log("request sent succesfully");
			});
			return promiseObj;
		}
	}]);

	return CardActions;
}();

exports.default = CardActions;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(2);

var _bling = __webpack_require__(0);

var _domReady = __webpack_require__(1);

var _domReady2 = _interopRequireDefault(_domReady);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ })
/******/ ]);
//# sourceMappingURL=App.bundle.js.map