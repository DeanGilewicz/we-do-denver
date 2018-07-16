class CardActions {
	constructor({card, trigger, cancel, save, inputs = [], multiInputContainer = undefined, deleteEl = undefined, addEl = undefined, endpointUrl, redirectUrl, response, responseMessage} = {}) {
		
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
		this.rollback = [...this.formInputs].map( input => input.cloneNode(true) );

		// current input index
		this.inputIndex = 0;

		/* events */

		const wrapperElId = this.card.getAttribute('id');
		const triggerElAttr = this.trigger.getAttribute('data-trigger');
		const cancelElAttr = this.cancel.getAttribute('data-cancel');
		const saveElAttr = this.save.getAttribute('data-save');

		// set ref to data name for DOM els
		this.attrValue = triggerElAttr;
		// console.log('attrvalue', this.attrValue);
		
		// set up focus event on container of mulitple inputs to keep track of last selected input
		if( this.formInputs.length > 0 && typeof multiInputContainer !== 'undefined' ) {
			this.multiInputContainer.addEventListener('focus', e => {
				const elIndex = e.target.name.split('-')[1];
				this.inputIndex = parseInt(elIndex, 0);
			}, true);
		}
		// trigger
		this._eventDelegate(`#${wrapperElId}`, 'click', `[data-trigger=${this.attrValue}]`, e => {
			this._hideTrigger();
			this._showCancel();
			this._showSave();
			this._showDelete();
			this._showAdd();
			this._enableInput();
		});
		// cancel
		this._eventDelegate(`#${wrapperElId}`, 'click', `[data-cancel=${this.attrValue}]`, e => {
			this._resetInputValue();
			this._disableInput();
			this._hideCancel();
			this._hideSave();
			this._hideDelete();
			this._hideAdd();
			this._showTrigger();
			this.responseMessage.textContent = "";
			this.response.classList.remove('ajax__response--error');
		});
		// save
		this._eventDelegate(`#${wrapperElId}`, 'click', `[data-save=${this.attrValue}]`, e => {
			this._saveInputValue();
		});
		// delete
		if( typeof this.deleteInput !== 'undefined' ) {
			const deleteElAttr = this.deleteInput.getAttribute('data-delete');
			this._eventDelegate(`#${wrapperElId}`, 'click', `[data-delete=${this.attrValue}]`, e => {
				this._deleteInput();
			});
		}
		// add
		if( typeof this.addInput !== 'undefined' ) {
			const addElAttr = this.addInput.getAttribute('data-add');
			this._eventDelegate(`#${wrapperElId}`, 'click', `[data-add=${this.attrValue}]`, e => {
				this._addInput();
			});
		}
	}
	_hideTrigger() {
		this.trigger.classList.add('hide');
	}
	_showTrigger() {
		this.trigger.classList.remove('hide');
	}
	_hideCancel() {
		this.cancel.classList.remove('active');
	}
	_showCancel() {
		this.cancel.classList.add('active');
	}
	_hideSave() {
		this.save.classList.remove('active');
	}
	_showSave() {
		this.save.classList.add('active');
	}
	_hideDelete() {
		if( typeof this.deleteInput !== 'undefined' ) {
			this.deleteInput.classList.remove('active');
		}
	}
	_showDelete() {
		if( typeof this.deleteInput !== 'undefined' ) {
			this.deleteInput.classList.add('active');
		}
	}
	_hideAdd() {
		if( typeof this.addInput !== 'undefined' ) {
			this.addInput.classList.remove('active');
		}
	}
	_showAdd() {
		if( typeof this.addInput !== 'undefined' ) {
			this.addInput.classList.add('active');
		}
	}
	_deleteInput() {
		/* delete tag that was in focus */

		// convert to array
		const inputsArray = Array.from(this.formInputs);
		const inputsStart = inputsArray.slice(0, this.inputIndex);
		const inputsEnd = inputsArray.slice(this.inputIndex+1, this.formInputs.length);

		// merge start and end without deleted el
		const updatedArray = [...inputsStart, ...inputsEnd];

		// update reference for formInputs
		this.formInputs = updatedArray;
		
		// set up dom
		const domInputsHtml = updatedArray.map( (el, i) => {
			return `<input class="form__input form__input--${this.attrValue}" name="${this.attrValue}-${i}" value="${el.value}" data-input="${this.attrValue}" />`
		});
		
	 	// update DOM
		this.multiInputContainer.innerHTML = domInputsHtml.join('');

	}
	_addInput() {

		// create DOM node
		const additionalInput = document.createElement('input');
		additionalInput.classList.add("form__input", `form__input--${this.attrValue}`);
		additionalInput.setAttribute('name', `${this.attrValue}-${this.formInputs.length}`);
		additionalInput.setAttribute('value', "");
		additionalInput.setAttribute('data-input', `${this.attrValue}`);

		const updatedArray = [...this.formInputs, additionalInput];
		// console.log(this.formInputs);
		// console.log(additionalInput);
		// console.log(updatedArray);

		// update reference for formInputs
		// this.formInputs = updatedArray;

		// set up dom
		const domInputsHtml = updatedArray.map( (el, i) => {
			return `<input class="form__input form__input--${this.attrValue}" name="${this.attrValue}-${i}" value="${el.value}" data-input="${this.attrValue}" />`
		});
		
	 	// update DOM
		this.multiInputContainer.innerHTML = domInputsHtml.join('');
		
		// get reference to dom elements
		this.formInputs = this.multiInputContainer.querySelectorAll(`[data-input="${this.attrValue}"]`);
		// focus in last input
		this.formInputs[this.formInputs.length-1].focus();

	}	
	_disableInput() {
		if( this.formInputs.length > 0 ) {
			this.formInputs.forEach( (formInput) => {
				formInput.setAttribute('disabled', 'disabled');
				formInput.blur();
			});
		} 
	}
	_enableInput() {

		if( this.formInputs.length > 0 && typeof this.multiInputContainer !== 'undefined' ) {
			// get reference to newly added DOM elements
			this.formInputs = this.multiInputContainer.querySelectorAll(`[data-input="${this.attrValue}"]`);
		} 

		if( this.formInputs.length > 0 ) {
			this.formInputs.forEach( (formInput, i) => {
				formInput.removeAttribute('disabled');
				if( i === 0 ) {
					formInput.focus();
					this._moveCursorToEnd(formInput);
				}
			});
		}

	}
	_resetInputValue() {
		if( this.formInputs.length > 0 && typeof this.multiInputContainer !== 'undefined' ) {
			// reset to initial elements
			this.formInputs = this.rollback;
			// update DOM
			this.multiInputContainer.innerHTML = this.formInputs.map( (el, i) => {
				return `<input class="form__input form__input--${this.attrValue}" name="${this.attrValue}-${i}" value="${el.value}" data-input="${this.attrValue}" disabled />`
			}).join('');
		} else if( this.formInputs.length > 0 ) {
			// reset value
			this.formInputs.forEach( (formInput, i) => {
				formInput.value = this.rollback[i].value;
			});
		}
	}
	_saveInputValue() {
		// reset reference to keep state in sync
		// this.formInputs.length = 0;
		// this.formInputs = [];
		if( this.formInputs.length > 0 ) {
			const data = {};
			this.formInputs.forEach( (formInput) => {
				// handle tags differently since data structure is { tags: ['this','is','it'] }
				if( formInput.name.indexOf('tag') > -1 ) {
					if( typeof data.tags === 'undefined' ) {
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
			this._ajaxPost('POST', this.endpointUrl, data)
				.then( (res) => {
					console.log('res', res);
					this.responseMessage.textContent = "Update successful!";
					this.response.classList.add('ajax__response--success');
					const uiTimeOut = setTimeout( () => {
						this.response.classList.remove('ajax__response--success');
						this.responseMessage.textContent = "";
						window.clearTimeout(uiTimeOut);
						if( this.redirectUrl ) {
							window.location.href = this.redirectUrl;
						}
					}, 1000);
					
				})
				.catch( (err) => {
					console.error('err', err);
					this.responseMessage.textContent = "Unable to update. Please try again.";
					this.response.classList.add('ajax__response--error');
					const uiTimeOut = setTimeout( () => {
						this.response.classList.remove('ajax__response--error');
						this.responseMessage.textContent = "";
						window.clearTimeout(uiTimeOut);
					}, 1000);
				});
		}
	}
	_eventDelegate(elSelector, eventName, selector, fn) {
		const element = document.querySelector(elSelector);
		// console.log(element);
		// console.log(eventName);
		// console.log(selector);
		element.addEventListener(eventName, (event) => {
			const possibleTargets = element.querySelectorAll(selector);
			// console.log(possibleTargets);
			const target = event.target;
			for (let i = 0, l = possibleTargets.length; i < l; i++) {
				let el = target;
				let p = possibleTargets[i];

				while(el && el !== element) {
					if (el === p) {
						return fn.call(p, event);
					}
					el = el.parentNode;
				}
			}
		});
	}
	_moveCursorToEnd(input) {
		// If this function exists... (IE 9+)
		if( input.setSelectionRange ) {
			// Double the length because Opera is inconsistent about whether a carriage return is one character or two.
			const len = input.value.length * 2;
			// Timeout seems to be required for Blink
			setTimeout( () => {
				input.setSelectionRange(len, len);
			}, 1);
		} else {
			// As a fallback, replace the contents with itself
			// Doesn't work in Chrome, but Chrome supports setSelectionRange
			input.value(input.value());
		}
	}
	_ajaxPost(methodType, url, data) {
		const promiseObj = new Promise( (resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(methodType, url, true);
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.send(JSON.stringify(data));
			xhr.onreadystatechange = () => {
				if( xhr.readyState === 4 ) {
					if( xhr.status === 200 ) {
						console.log("xhr done successfully");
						const resp = xhr.responseText;
						const respJson = JSON.parse(resp);
						resolve(respJson);
					} else {
						reject(xhr.status);
						console.log("xhr failed");
					}
				} else {
					console.log("xhr processing going on");
				}
			}
			console.log("request sent succesfully");
		});
		return promiseObj;
	}
}

export default CardActions;
