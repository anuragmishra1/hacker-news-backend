'use strict';

const crypto = require('crypto');
const Boom = require('boom');

const CONFIG = require('../Config');

const failActionFunction = (request, reply, error) => {
	let customErrorMessage = '';
	if (error.output.payload.message.indexOf('[') > -1) {
		customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
	} else {
		customErrorMessage = error.output.payload.message;
	}
	customErrorMessage = customErrorMessage.replace(/"/g, '');
	customErrorMessage = customErrorMessage.replace('[', '');
	customErrorMessage = customErrorMessage.replace(']', '');
	error.output.payload.message = customErrorMessage;
	delete error.output.payload.validation;
	return error;
};

const sendError = (data) => {
	console.trace('ERROR OCCURED ', data);
	if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
		console.log('Attaching Response Type :::: ', data.type);
		const errorToSend = new Boom(data.customMessage, { statusCode: data.statusCode });
		errorToSend.output.payload.responseType = data.type;
		return errorToSend.output.payload;
	} else {
		let errorToSend = '';
		if (typeof data === 'object') {
			if (data.name === 'BulkWriteError' || data.name === 'MongoError') {
				// errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.DB_ERROR.customMessage;
				if (data.code === 11000) {
					let key = data.errmsg.substr(data.errmsg.lastIndexOf('index: ') + 7);
					key = key.substr(0, key.indexOf('_1'));
					key = key.charAt(0).toUpperCase() + key.substr(1, key.length);

					// let duplicateValue = data.errmsg && data.errmsg.substr(data.errmsg.lastIndexOf('{ : "') + 5);
					// duplicateValue = duplicateValue.replace('}', '');
					errorToSend = `${key} already exist`;
				}
			} else if (data.name === 'ApplicationError') {
				errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.APP_ERROR.customMessage + ' : ';
			} else if (data.name === 'ValidationError') {
				errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.APP_ERROR.customMessage + data.message;
			} else if (data.name === 'CastError') {
				errorToSend += CONFIG.Constants.STATUS_MSG.ERROR.DB_ERROR.customMessage + CONFIG.Constants.STATUS_MSG.ERROR.INVALID_ID.customMessage + data.value;
			}
		} else {
			errorToSend = data;
		}

		let customErrorMessage = errorToSend;
		if (typeof customErrorMessage === 'string') {
			if (errorToSend.indexOf('[') > -1) {
				customErrorMessage = errorToSend.substr(errorToSend.indexOf('['));
			}
			customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
			customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
			customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');
		}
		const customErrorMessageToSend = new Boom(customErrorMessage, { statusCode: 400 });
		return customErrorMessageToSend.output.payload;
	}
};

const sendSuccess = (successMsg, data) => {
	successMsg = successMsg || CONFIG.Constants.STATUS_MSG.SUCCESS.DEFAULT.customMessage;
	if (typeof successMsg === 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')) {
		return { statusCode: successMsg.statusCode, message: successMsg.customMessage, data: data || {} };
	} else {
		return { statusCode: 200, message: successMsg, data: data || {} };
	}
};

const deleteUnnecessaryUserData = (userObj) => {
	delete userObj['__v'];
	delete userObj['password'];
	delete userObj['access_token'];
	delete userObj['created_on'];
	delete userObj['modified_on'];
	return userObj;
};

const userProjection = {
	__v: !1,
	password: !1,
	access_token: !1
};

const createHash = (str) => {
	if (typeof (str) === 'string' && str.length > 0) {
		const hash = crypto.createHmac('sha256', CONFIG.Constants.SERVER_KEYS.HASHING_SECRET_KEY).update(str).digest('hex');
		return hash;
	} else {
		return false;
	}
};

module.exports = {
	failActionFunction,
	sendError,
	sendSuccess,
	deleteUnnecessaryUserData,
	userProjection,
	createHash
};
