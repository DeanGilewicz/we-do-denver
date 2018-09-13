import CardActions from './card';

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

	// restrict to dom element since hard to do for name of route

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

	// if( document.querySelector('#js-visit-form') ) {
	// 	// focus on first input on single visit form page
	// 	document.querySelector('input[name="rating"]').focus();
	// }

});