'use strict';

const server = {
	host: process.env.HOST || '0.0.0.0',
	port: process.env.PORT || '3000'
};

const swaggerOptions = {
	info: {
		title: 'Hacker News Documentation',
		version: '0.0.1',
		description: 'This is a Hacker News Backend server. Please enter api like this `Bearer AUTH_TOKEN`'
	},
	grouping: 'tags',
	sortTags: 'name',
	expanded: 'none',
	securityDefinitions: {
		Bearer: {
			type: 'apiKey',
			name: 'Authorization',
			in: 'header'
		}
	},
	security: [{ 'Bearer': [] }],
	basePath: '/api',
	documentationPath: '/explorer',
	swaggerUI: false,
	sortEndpoints: 'method'
};

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
	swaggerOptions.host = `${server.host}:${server.port}`;
}

module.exports = {
	server,
	swaggerOptions
};
