'use strict';

const Jwt = require('jsonwebtoken');

const Config = require('../Config');
const Services = require('../Services');

const setToken = async (tokenData) => {
	if (!tokenData.id) {
		return Config.Constants.STATUS_MSG.ERROR.IMP_ERROR;
	} else {
		const tokenToSend = Jwt.sign(tokenData, Config.Constants.SERVER_KEYS.JWT_SECRET_KEY); // {expiresIn: '18h'}
		await setTokenInDB(tokenData.id, tokenToSend);
		return { accessToken: tokenToSend };
	}
};

const setTokenInDB = async (userId, tokenToSave) => {
	let userData = {};
	const criteria = {
		_id: userId
	};
	const setQuery = {
		access_token: tokenToSave
	};
	const options = {
		new: true
	};
	try {
		userData = await Services.Users.update(criteria, setQuery, options);
	} catch (err) {
		throw err;
	}

	if (userData === null) {
		return Config.Constants.STATUS_MSG.ERROR.IMP_ERROR;
	}
	return;
};

const verifyToken = async (token) => {
	let decoded = {};
	let userData = {};
	try {
		decoded = await Jwt.verify(token, Config.Constants.SERVER_KEYS.JWT_SECRET_KEY);
	} catch (err) {
		console.error('Error while verifying token: ', err);
		throw err;
	}
	try {
		userData = await getTokenFromDB(decoded.id, token);
	} catch (err) {
		throw err;
	}
	return userData;
};

const getTokenFromDB = async (userId, token) => {
	let userData = {};
	const criteria = {
		_id: userId,
		access_token: token
	};
	try {
		userData = await Services.Users.findOne(criteria, {}, { lean: true });
	} catch (err) {
		throw err;
	}
	if (userData && userData._id) {
		userData.id = userData._id;
		delete userData._id;
	} else {
		throw Config.Constants.STATUS_MSG.ERROR.INVALID_TOKEN;
	}
	return { userData: userData };
};

module.exports = {
	setToken,
	verifyToken
};
