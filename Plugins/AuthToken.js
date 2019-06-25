'use strict';

const AuthBearer = require('hapi-auth-bearer-token');

const { TokenManager } = require('../Lib');

const register = async (server, options) => {

	// Register Authorization Plugin
	await server.register(AuthBearer);

	server.auth.strategy('Basic', 'bearer-access-token', {
		// allowMultipleHeaders: true,
		allowQueryToken: true,
		validate: async (request, token, h) => {
			let isValid = false;
			let artifacts = {};
			let response = {};
			let credentials = {};
			try {
				response = await TokenManager.verifyToken(token);
			} catch (err) {
				isValid = false;
				artifacts = {};
			}
			if (response && response.userData) {
				isValid = true;
				credentials = {
					token: token
				};
				artifacts = { userData: response.userData };
			}

			return { isValid, credentials, artifacts };
		}
	});
};

module.exports = {
	register
};
