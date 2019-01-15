// import axios from 'axios';
// import dompurify from 'dompurify';

// function searchResultsHTML(places) {
// 	return places.map(place => {
// 		return `
// 			<a href="/place/${place._id}" class="search__result">
// 				<strong>${place.name}</strong>
// 			</a>
// 		`;
// 	}).join('');
// }

// function typeAhead(search) {
// 	if( !search ) return;
// 	const searchInput = search.querySelector('input[name="search"]');
// 	const searchResults = search.querySelector('.search__results');
// 	searchInput.on('input', function() {
// 		// if no value - hide search results 
// 		if( !this.value ) {
// 			searchResults.style.display = 'none';
// 			return;
// 		}
// 		// show search results
// 		searchResults.style.display = 'block';
// 		searchResults.innerHTML = '';

// 		axios
// 			.get(`/api/search?q=${this.value}`)
// 			.then(res => {
// 				if( !res.data.length ) {
// 					searchResults.innerHTML = dompurify.sanitize(`<div class="search__result">Sorry but no results for ${this.value} found!</div>`);
// 					return;
// 				}
// 				searchResults.innerHTML = dompurify.sanitize(searchResultsHTML(res.data));
// 			})
// 			.catch(err => {
// 				console.error(err);
// 			});
// 	});
// 	// handle keyboard inputs
// 	searchInput.on('keyup', (e) => {
// 		// if up, down, enter not pressed then skip
// 		if( ![38, 40, 13, 27].includes(e.keyCode) ) {
// 			return;
// 		}
// 		const activeClass = 'search__result--active';
// 		const current = search.querySelector(`.${activeClass}`);
// 		const items = search.querySelectorAll('.search__result');
// 		let next; // if someone presses down or up
// 		if( e.keyCode === 40 && current ) { // already selected and press down
// 			next = current.nextElementSibling || items[0];
// 		} else if( e.keyCode === 40 ) { // nothing selected and press down
// 			next = items[0];
// 		} else if( e.keyCode === 38 && current ) {
// 			next = current.previousElementSibling || items[items.length-1];
// 		} else if( e.keyCode === 38 ) {
// 			next = items[items.length-1];
// 		} else if( e.keyCode === 27 ) {
// 			// if escape is pressed need to reset
// 			searchResults.style.display = 'none';
// 			searchResults.innerHTML = '';
// 			searchInput.value = '';
// 			return;
// 		} else if( e.keyCode === 13 && current.href ) {
// 			window.location = current.href;
// 			return;
// 		}
// 		if( current ) {
// 			current.classList.remove(activeClass);
// 		}
// 		next.classList.add(activeClass);
// 	});
// };

// export default typeAhead;