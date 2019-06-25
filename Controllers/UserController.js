'use strict';

const CONFIG = require('../Config');
const Services = require('../Services');
const { TokenManager } = require('../Lib');
const UniversalFunctions = require('../Utils/UniversalFunctions');

const signup = async (request) => {
	const data = request.payload;
	let userData = {};
	data.password = UniversalFunctions.createHash(data.password);
	try {
		userData = await Services.Users.create(data);
	} catch (err) {
		throw err;
	}

	return UniversalFunctions.deleteUnnecessaryUserData(userData);
};

const login = async (request) => {
	const data = request.payload;
	let userFound = {};
	let successLogin = false;
	try {
		const criteria = {
			email: data.email
		};
		const result = await Services.Users.findOne(criteria, {}, {});
		userFound = result || null;
	} catch (err) {
		console.error('Login Error :::: ', err);
		throw err;
	}
	if (!userFound) {
		throw CONFIG.Constants.STATUS_MSG.ERROR.INVALID_USER_PASS;
	} else {
		const password = UniversalFunctions.createHash(data.password);
		if (userFound && userFound.password !== password) {
			throw CONFIG.Constants.STATUS_MSG.ERROR.INCORRECT_PASSWORD;
		} else {
			successLogin = true;
		}
	}
	if (successLogin) {
		let responseData = {};
		try {
			responseData = await setTokenAndGetData(userFound);
		} catch (err) {
			throw err;
		}
		return responseData;
	} else {
		throw CONFIG.Constants.ERROR.IMP_ERROR;
	}
};

const logout = async (request) => {
	const criteria = {
		_id: request.auth.artifacts.userData.id
	};
	const setQuery = {
		$set: {
			access_token: null
		}
	};
	try {
		await Services.Users.update(criteria, setQuery, {});
	} catch (err) {
		throw err;
	}
	return CONFIG.Constants.STATUS_MSG.SUCCESS.LOGOUT;
};

const setTokenAndGetData = async (userData) => {
	let accessToken = null;
	let output = {};
	try {
		let tokenData = {
			id: userData._id
		};
		output = await TokenManager.setToken(tokenData);
	} catch (err) {
		throw err;
	}

	if (output && output.accessToken) {
		accessToken = output && output.accessToken;
	} else {
		throw CONFIG.Constants.ERROR.IMP_ERROR;
	}
	delete userData._id;
	return {
		access_token: accessToken,
		id: userData._id,
		user_details: UniversalFunctions.deleteUnnecessaryUserData(userData)
	};
};

module.exports = {
	signup,
	login,
	logout
};
