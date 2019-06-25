'use strict';

module.exports = [
	{ register: require('./Swagger').register, 'name': 'swagger-plugin' },
	{ register: require('./AuthToken').register, 'name': 'auth-token-plugin' }
];
