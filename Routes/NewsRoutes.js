'use strict';

const Joi = require('joi');

const CONFIG = require('../Config');
const UniversalFunctions = require('../Utils/UniversalFunctions');
const Controller = require('../Controllers');

const ID_VALIDATION = Joi.string().regex(/^[0-9a-fA-F]{24}$/).error(new Error('Invalid id provided')).required();

module.exports = [
	{
		method: 'GET',
		path: '/api/news',
		handler: async (request, h) => {
			try {
				const data = await Controller.NewsController.getNews(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('news getNews err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'To get list of news',
			tags: ['api', 'news'],
			validate: {
				query: {
					limit: Joi.number(),
					skip: Joi.number()
				},
				headers: UniversalFunctions.authorizationHeaderObj,
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
		path: '/api/news',
		handler: async (request, h) => {
			try {
				const data = await Controller.NewsController.create(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('news create err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'To create news',
			tags: ['api', 'news'],
			auth: {
				strategies: ['Basic']
			},
			validate: {
				payload: {
					url: Joi.string().uri().required()
				},
				options: {
					allowUnknown: false
				},
				headers: UniversalFunctions.authorizationHeaderObj,
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
		path: '/api/news/{id}',
		handler: async (request, h) => {
			try {
				const data = await Controller.NewsController.update(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('news update err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'To update news',
			tags: ['api', 'news'],
			auth: {
				strategies: ['Basic']
			},
			validate: {
				params: {
					id: ID_VALIDATION
				},
				payload: {
					title: Joi.string(),
					url: Joi.string().uri().required()
				},
				options: {
					allowUnknown: false
				},
				headers: UniversalFunctions.authorizationHeaderObj,
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
		path: '/api/news/{id}/vote',
		handler: async (request, h) => {
			try {
				const data = await Controller.NewsController.newsVote(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('news update err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'To vote news, up_vote will increment when pass true in vote payload and vice-versa',
			tags: ['api', 'news'],
			auth: {
				strategies: ['Basic']
			},
			validate: {
				params: {
					id: ID_VALIDATION
				},
				payload: {
					vote: Joi.boolean().valid(true, false)
				},
				options: {
					allowUnknown: false
				},
				headers: UniversalFunctions.authorizationHeaderObj,
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
		method: 'DELETE',
		path: '/api/news/{id}',
		handler: async (request, h) => {
			try {
				const data = await Controller.NewsController.remove(request);
				return UniversalFunctions.sendSuccess(null, data);
			} catch (err) {
				console.error('news remove err=========', err);
				const errorResponse = UniversalFunctions.sendError(err);
				return h.response(errorResponse).code(errorResponse.statusCode);
			}
		},
		config: {
			description: 'To delete news',
			tags: ['api', 'news'],
			auth: {
				strategies: ['Basic']
			},
			validate: {
				params: {
					id: ID_VALIDATION
				},
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
