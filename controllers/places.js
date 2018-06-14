module.exports = (req, res) => {
	const places = [{
		name: "Cool Food",
		address: "123 road, city, state",
		distance: "12",
		cost: "2.02",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Fuel Me"
		},
		tags: [],
		rating: "1.4",
		visits: "2"
	},
	{
		name: "Fun Outdoor Hike",
		address: "444 road, city, state",
		distance: "2",
		cost: "2.43",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Hike It"
		},
		tags: [],
		rating: "2.71",
		visits: "6"
	},
	{
		name: "In Much Need Of",
		address: "543 road, city, state",
		distance: "4",
		cost: "1.67",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Thirst Quenching"
		},
		tags: [],
		rating: "1.3",
		visits: "2"
	},
	{
		name: "Ski Destination",
		address: "99 road, city, state",
		distance: "60",
		cost: "2.12",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "On The Slopes"
		},
		tags: [],
		rating: "2.07",
		visits: "4"
	},
	{
		name: "Rockies",
		address: "99 road, city, state",
		distance: "3",
		cost: "1.99",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Entertain Us"
		},
		tags: [],
		rating: "2.64",
		visits: "3"
	},
	{
		name: "Outlet Mall",
		address: "99 road, city, state",
		distance: "7",
		cost: "2.32",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Shopping Bags"
		},
		tags: [],
		rating: "2.21",
		visits: "5"
	},
	{
		name: "Rough Mountain Trail",
		address: "52 road, city, state",
		distance: "43",
		cost: "1.74",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Hike It"
		},
		tags: [],
		rating: "0.94",
		visits: "6"
	},
	{
		name: "Red Rocks",
		address: "1 road, city, state",
		distance: "26",
		cost: "2.93",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Entertain Us"
		},
		tags: [],
		rating: "2.31",
		visits: "5"
	},
	{
		name: "Sushi Sushi",
		address: "93 road, city, state",
		distance: "1",
		cost: "2.09",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Fuel Me"
		},
		tags: [],
		rating: "2.15",
		visits: "2"
	},
	{
		name: "Cherry Creek Mall",
		address: "99 road, city, state",
		distance: "4",
		cost: "1.38",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Shopping Bags"
		},
		tags: [],
		rating: "2",
		visits: "2"
	},
	{
		name: "Viewhouse",
		address: "99 road, city, state",
		distance: "3",
		cost: "2",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "Thirst Quenching"
		},
		tags: [],
		rating: "2",
		visits: "1"
	},
	{
		name: "Ski Village Resort",
		address: "45 road, city, state",
		distance: "50",
		cost: "2.32",
		img: "http://via.placeholder.com/300x300?text=card",
		category: {
			icon: "",
			name: "On The Slopes"
		},
		tags: [],
		rating: "2.21",
		visits: "5"
	}






	];

	res.render('places/index', { places });
};