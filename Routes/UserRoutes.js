'use strict';

const Joi = require('joi');

const CONFIG = require('../Config');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Controller = require('../Controllers');

module.exports = [
	{
		method: 'POST',
		path: '/api/user/signup',
		handler: async (request, h) => {
			try {
				const data = await Controller.UserController.signup(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('user signup err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'For user signup',
			tags: ['api', 'user'],
			validate: {
				payload: {
					first_name: Joi.string().required(),
					last_name: Joi.string().required(),
					email: Joi.string().email().required(),
					password: Joi.string().required()
				},
				failAction: UniversalFunctions.failActionFunction
			},
			plugins: {
				'hapi-swagger': {
					responseMessages: CONFIG.Constants.swaggerDefaultResponseMessages
				}
			}
		}
	},
	{
		method: 'POST',
		path: '/api/user/login',
		handler: async (request, h) => {
			try {
				const data = await Controller.UserController.login(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('user login err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'For user login',
			tags: ['api', 'user'],
			validate: {
				payload: {
					email: Joi.string().email(),
					password: Joi.string().required()
				},
				failAction: UniversalFunctions.failActionFunction
			},
			plugins: {
				'hapi-swagger': {
					responseMessages: CONFIG.Constants.swaggerDefaultResponseMessages
				}
			}
		}
	},
	{
		method: 'PUT',
		path: '/api/user/logout',
		handler: async (request, h) => {
			try {
				const data = await Controller.UserController.logout(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('user logout err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'For user logout',
			tags: ['api', 'user'],
			auth: {
				strategies: ['Basic']
			},
			validate: {
				headers: UniversalFunctions.authorizationHeaderObj,
				failAction: UniversalFunctions.failActionFunction
			},
			plugins: {
				'hapi-swagger': {
					responseMessages: CONFIG.Constants.swaggerDefaultResponseMessages
				}
			}
		}
	}
];
