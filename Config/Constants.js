'use strict';

const swaggerDefaultResponseMessages = [
	{ code: 200, message: 'OK' },
	{ code: 400, message: 'Bad Request' },
	{ code: 401, message: 'Unauthorized' },
	{ code: 404, message: 'Data Not Found' },
	{ code: 500, message: 'Internal Server Error' }
];

const SERVER_KEYS = {
	JWT_SECRET_KEY: 'sUPerSeCuR&T^^&&*#^^#348723t4872t34Ends',
	HASHING_SECRET_KEY: 'thisIsASecret'
};

var STATUS_MSG = {
	ERROR: {
		INVALID_USER_PASS: {
			statusCode: 401,
			type: 'INVALID_USER_PASS',
			customMessage: 'Invalid username or password'
		},
		INCORRECT_PASSWORD: {
			statusCode: 400,
			customMessage: 'Incorrect Password',
			type: 'INCORRECT_PASSWORD'
		},
		DB_ERROR: {
			statusCode: 400,
			customMessage: 'DB Error : ',
			type: 'DB_ERROR'
		},
		INVALID_ID: {
			statusCode: 400,
			customMessage: 'Invalid Id Provided : ',
			type: 'INVALID_ID'
		},
		APP_ERROR: {
			statusCode: 400,
			customMessage: 'Application Error',
			type: 'APP_ERROR'
		},
		IMP_ERROR: {
			statusCode: 500,
			customMessage: 'Implementation Error',
			type: 'IMP_ERROR'
		},
		INVALID_TOKEN: {
			statusCode: 401,
			customMessage: 'Invalid token provided',
			type: 'INVALID_TOKEN'
		}
	},
	SUCCESS: {
		DEFAULT: {
			statusCode: 200,
			customMessage: 'Success',
			type: 'DEFAULT'
		},
		CREATED: {
			statusCode: 201,
			customMessage: 'Created Successfully',
			type: 'CREATED'
		},
		UPDATED: {
			statusCode: 200,
			customMessage: 'Updated Successfully',
			type: 'UPDATED'
		},
		DELETED: {
			statusCode: 200,
			customMessage: 'Deleted Successfully',
			type: 'DELETED'
		},
		LOGOUT: {
			statusCode: 200,
			customMessage: 'Logged Out Successfully',
			type: 'LOGOUT'
		}
	}
};

module.exports = {
	swaggerDefaultResponseMessages,
	SERVER_KEYS,
	STATUS_MSG
};
