'use strict';

const UserRoutes = require('./UserRoutes');
const NewsRoutes = require('./NewsRoutes');

const pingRoute = [
	{
		method: 'GET',
		path: '/',
		handler: (request, h) => {
			return {
				status: 200,
				message: 'API is UP!'
			};
		}
	}
];

const all = pingRoute.concat(UserRoutes, NewsRoutes);

module.exports = all;
