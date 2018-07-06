import CardActions from './card';

const domReady = callback => {
	"use strict";
    if( document.readyState === "interactive" || document.readyState === "complete" ) { callback(); } else { document.addEventListener("DOMContentLoaded", callback); }
};

domReady( () => {
   	"use strict";

	// restrict to dom element since hard to do for name of route

   	if( document.querySelector('#js-card') ) {

		const nameOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="name"]'),
			cancel: document.querySelector('[data-cancel="name"]'),
			save: document.querySelector('[data-save="name"]'),
			inputs: document.querySelectorAll('[data-input="name"]'),
			url: 'https://apple.com',
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		const addressOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="address"]'),
			cancel: document.querySelector('[data-cancel="address"]'),
			save: document.querySelector('[data-save="address"]'),
			inputs: document.querySelectorAll('[data-input="address"]'),
			multiInputContainer: document.querySelector('#address__container'),
			url: 'https://apple.com',
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		const tagsOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="tag"]'),
			cancel: document.querySelector('[data-cancel="tag"]'),
			save: document.querySelector('[data-save="tag"]'),
			inputs: document.querySelectorAll('[data-input="tag"]'),
			multiInputContainer: document.querySelector('#tag__container'),
			deleteEl: document.querySelector('[data-delete="tag"]'),
			addEl: document.querySelector('[data-add="tag"]'),
			url: 'https://apple.com',
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		const cardActionsName = new CardActions(nameOptions);
		const cardActionsAddress = new CardActions(addressOptions);
		const cardActionsTags = new CardActions(tagsOptions);

	}

	// restrict to dom element since hard to do for name of route

	if( document.querySelector('#js-visit-form') ) {
		// focus on first input on single visit form page
		document.querySelector('input[name="rating"]').focus();
	}

});