import CardActions from './card';
import axios from 'axios';

const domReady = callback => {
	"use strict";
    if( document.readyState === "interactive" || document.readyState === "complete" ) { callback(); } else { document.addEventListener("DOMContentLoaded", callback); }
};

domReady( () => {
   	"use strict";

   	if( document.querySelector('#img') ) {

   		const readURL = input => {
			if (input.files && input.files[0]) {
				const imgPreviewContainer = document.querySelector('.form__image--container');
				const imgPreviewEl = document.querySelector('.image__preview');
				let reader = new FileReader();

				reader.onload = function(e) {
					imgPreviewEl.setAttribute('src', e.target.result);
					imgPreviewContainer.style.display = 'block';
				}

				reader.readAsDataURL(input.files[0]);
			}
		};

   		const fileUploadInput = document.querySelector('#img');
   		
   		fileUploadInput.on('change', function(e) {
   			readURL(this);
   		});
   	}

   	if( document.querySelector('#img-update') ) {

   		const currentImage = document.querySelector('#current-image');
		const imgPreviewEl = document.querySelector('.image__preview');
		const fileUploadInput = document.querySelector('#img-update');
		const imageChangeCancel = document.querySelector('#image-cancel');
		const editImageTrigger = document.querySelector('[data-trigger="image"]');
		const changeImageTrigger = document.querySelector('.form__input--image-wrapper');

   		const readURL = input => {
			if (input.files && input.files[0]) {
				let reader = new FileReader();
				reader.onload = function(e) {
					imgPreviewEl.setAttribute('src', e.target.result);
					currentImage.style.display = 'none';
				}
				reader.readAsDataURL(input.files[0]);
			}
		};
   		
   		fileUploadInput.on('change', function(e) {
   			readURL(this);
   		});

   		imageChangeCancel.addEventListener('click', () => {
   			fileUploadInput.value = '';
   			changeImageTrigger.style.display = 'none';
   			imgPreviewEl.setAttribute('src', '');
   			currentImage.style.display = 'block';
   		});

   		editImageTrigger.addEventListener('click', () => {
   			imgPreviewEl.setAttribute('src', '');
			currentImage.style.display = 'none';
   			changeImageTrigger.style.display = 'block';
   		});
   	}

   	// dropdown sort category
   	if( document.querySelector('#js-sort-category') ) {

   		const getQueryStringParams = query => {
		    return query ? (/^[?#]/.test(query) ? query.slice(1) : query)
	            .split('&')
	            .reduce((params, param) => {
	                    let [key, value] = param.split('=');
	                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
	                    return params;
	                }, {}
	            )
	        : {}
		};
		
		// check if query params exist in url
		const queryParams = getQueryStringParams(window.location.search);
		let dropdownValue;
		if( Object.keys(queryParams).length !== 0 && queryParams.constructor === Object ) {
			// construct the value for drop down so can sync value between dropdown and url
			dropdownValue = queryParams.q + '-' + queryParams.s;
		}
		
		// ref to select element
   		const sortEl = document.querySelector('#js-sort-category select');

   		// if query params then sync dropdown
   		if( dropdownValue ) {
   			sortEl.value = dropdownValue;
   		}

   		// add event for sorting
   		sortEl.addEventListener('change', function() {
   			const categorySlug = window.location.pathname.split('/')[2];
   			if( this.value !== "" ) {
   				const valueSplit = `${this.value}`.split('-');
	   			const sortValue = valueSplit[0];
	   			const sortOrder = valueSplit[1];
	   			window.location.href = `/categories/${categorySlug}?q=${sortValue}&s=${sortOrder}`;
   			} else {
   				window.location.href = `/categories/${categorySlug}`;
   			}
   		});
   	}

   	// dropdown sort places
   	if( document.querySelector('#js-sort-places') ) {

   		const getQueryStringParams = query => {
		    return query ? (/^[?#]/.test(query) ? query.slice(1) : query)
	            .split('&')
	            .reduce((params, param) => {
	                    let [key, value] = param.split('=');
	                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
	                    return params;
	                }, {}
	            )
	        : {}
		};
		
		// check if query params exist in url
		const queryParams = getQueryStringParams(window.location.search);
		let dropdownValue;
		if( Object.keys(queryParams).length !== 0 && queryParams.constructor === Object ) {
			// construct the value for drop down so can sync value between dropdown and url
			dropdownValue = queryParams.q + '-' + queryParams.s;
		}
		
		// ref to select element
   		const sortEl = document.querySelector('#js-sort-places select');

   		// if query params then sync dropdown
   		if( dropdownValue ) {
   			sortEl.value = dropdownValue;
   		}

   		// add event for sorting
   		sortEl.addEventListener('change', function() {
   			if( this.value !== "" ) {
   				const valueSplit = `${this.value}`.split('-');
	   			const sortValue = valueSplit[0];
	   			const sortOrder = valueSplit[1];
	   			window.location.href = `/places?q=${sortValue}&s=${sortOrder}`;
   			} else {
   				window.location.href = '/places';
   			}
   		});
   	}

   	// dropdown sort visits
   	if( document.querySelector('#js-sort-visits') ) {

   		const getQueryStringParams = query => {
		    return query ? (/^[?#]/.test(query) ? query.slice(1) : query)
	            .split('&')
	            .reduce((params, param) => {
	                    let [key, value] = param.split('=');
	                    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
	                    return params;
	                }, {}
	            )
	        : {}
		};
		
		// get place id since dynamic in url 
		const placeId = window.location.pathname.split('/')[2];
		// .filter(item => item !== "" && item !== 'place' && item !== 'visits');

		// check if query params exist in url
		const queryParams = getQueryStringParams(window.location.search);
		let dropdownValue;
		if( Object.keys(queryParams).length !== 0 && queryParams.constructor === Object ) {
			// construct the value for drop down so can sync value between dropdown and url
			dropdownValue = queryParams.q + '-' + queryParams.s;
		}
		
		// ref to select element
   		const sortEl = document.querySelector('#js-sort-visits select');

   		// if query params then sync dropdown
   		if( dropdownValue ) {
   			sortEl.value = dropdownValue;
   		}

   		// add event for sorting
   		sortEl.addEventListener('change', function() {
   			if( this.value !== "" ) {
   				const valueSplit = `${this.value}`.split('-');
	   			const sortValue = valueSplit[0];
	   			const sortOrder = valueSplit[1];
	   			window.location.href = `/place/${placeId}/visits?q=${sortValue}&s=${sortOrder}`;
   			} else {
   				window.location.href = `/place/${placeId}/visits`;
   			}
   		});
   	}

   	if( document.querySelector('#js-card') ) {

   		const urlArr = window.location.pathname.split('/');
		const urlId = urlArr[urlArr.length-1];	// need to grab id to use when posting data (record that is being modified / deleted)

		const imageOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="image"]'),
			cancel: document.querySelector('[data-cancel="image"]'),
			save: document.querySelector('[data-save="image"]'),
			inputs: document.querySelectorAll('[data-input="image"]'),
			endpointUrl: `/place/${urlId}/update-place`,
			redirectUrl: `/place/${urlId}`,
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		const nameOptions = {
			card: document.querySelector('#js-card'),
			trigger: document.querySelector('[data-trigger="name"]'),
			cancel: document.querySelector('[data-cancel="name"]'),
			save: document.querySelector('[data-save="name"]'),
			inputs: document.querySelectorAll('[data-input="name"]'),
			endpointUrl: `/place/${urlId}/update-place`,
			redirectUrl: `/place/${urlId}`,
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
			endpointUrl: `/place/${urlId}/update-place`,
			redirectUrl: `/place/${urlId}`,
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
			endpointUrl: `/place/${urlId}/update-place`,
			redirectUrl: `/place/${urlId}`,
			response: document.querySelector('.ajax__response'),
			responseMessage: document.querySelector('.response__message')
		};

		const cardActionsImage = new CardActions(imageOptions);
		const cardActionsName = new CardActions(nameOptions);
		const cardActionsAddress = new CardActions(addressOptions);
		const cardActionsTags = new CardActions(tagsOptions);

	}

});