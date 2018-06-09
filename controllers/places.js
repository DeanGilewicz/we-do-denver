module.exports = (req, res) => {
	const places = [{
		name: "cool food 1",
		address: "123 road, city, state",
		distance: "12",
		cost: "2",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Fuel Me"
		},
		tags: [],
		likes: "1",
		visits: "2"
	},
	{
		name: "cool hike 1",
		address: "444 road, city, state",
		distance: "2",
		cost: "1",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Hike It"
		},
		tags: [],
		likes: "2",
		visits: "2"
	}];

	res.render('places/index', { places });
};