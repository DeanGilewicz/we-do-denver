import CardActions from './card';

const domReady = callback => {
	"use strict";
    if( document.readyState === "interactive" || document.readyState === "complete" ) { callback(); } else { document.addEventListener("DOMContentLoaded", callback); }
};

domReady( () => {
   	"use strict";

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
		url: 'https://apple.com',
		response: document.querySelector('.ajax__response'),
		responseMessage: document.querySelector('.response__message')
	};

	const tagsOptions = {
		card: document.querySelector('#js-card'),
		trigger: document.querySelector('[data-trigger="tags"]'),
		cancel: document.querySelector('[data-cancel="tags"]'),
		save: document.querySelector('[data-save="tags"]'),
		inputs: document.querySelectorAll('[data-input="tags"]'),
		multiInputContainer: document.querySelector('#tag__container'),
		deleteEl: document.querySelector('[data-delete="tags"]'),
		addEl: document.querySelector('[data-add="tags"]'),
		url: 'https://apple.com',
		response: document.querySelector('.ajax__response'),
		responseMessage: document.querySelector('.response__message')
	};

	const cardActionsName = new CardActions(nameOptions);
	const cardActionsAddress = new CardActions(addressOptions);
	const cardActionsTags = new CardActions(tagsOptions);

});