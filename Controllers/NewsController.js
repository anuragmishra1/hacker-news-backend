'use strict';

const axios = require('axios');
const cheerio = require('cheerio');

const CONFIG = require('../Config');
const Services = require('../Services');

const getWebPageTitle = async (url) => {
	let webpageTitle = '';
	try {
		const pageData = await axios.get(url);
		const $ = cheerio.load(pageData.data);
		webpageTitle = $('title').text();
	} catch (err) {
		throw err;
	}
	return webpageTitle;
};

const create = async (request) => {
	const data = request.payload;
	let webPageTitle = await getWebPageTitle(data.url);

	const dataToSave = {
		title: webPageTitle,
		url: data.url
	};

	try {
		await Services.News.create(dataToSave);
	} catch (err) {
		throw err;
	}
	return CONFIG.Constants.STATUS_MSG.SUCCESS.CREATED;
};

const getNews = async (request) => {
	let news = [];
	const options = {
		lean: true,
		limit: request.query.limit || 0,
		skip: request.query.skip || 0,
		sort: {
			modified_on: -1
		}
	};
	try {
		news = await Services.News.find({}, { __v: 0 }, options);
	} catch (err) {
		throw err;
	}
	return news;
};

const newsVote = async (request) => {
	const data = request.payload;
	const criteria = {
		_id: request.params.id
	};

	const voteKey = data.vote ? 'up_vote' : 'down_vote';

	const dataToUpdate = {
		$inc: {
			[voteKey]: 1
		}
	};

	try {
		await Services.News.update(criteria, dataToUpdate, {});
	} catch (err) {
		throw err;
	}
	return CONFIG.Constants.STATUS_MSG.SUCCESS.UPDATED;
};

const update = async (request) => {
	const data = request.payload;
	const criteria = {
		_id: request.params.id
	};

	let webPageTitle = '';
	if (data.title) webPageTitle = data.title;
	else webPageTitle = await getWebPageTitle(data.url);

	const dataToUpdate = {
		title: webPageTitle,
		url: data.url
	};

	try {
		await Services.News.update(criteria, dataToUpdate, {});
	} catch (err) {
		throw err;
	}
	return CONFIG.Constants.STATUS_MSG.SUCCESS.UPDATED;
};

const remove = async (request) => {
	const criteria = {
		_id: request.params.id.toString()
	};
	try {
		await Services.Bots.deleteOne(criteria);
	} catch (err) {
		throw err;
	}
	return CONFIG.Constants.STATUS_MSG.SUCCESS.DELETED;
};

module.exports = {
	create,
	getNews,
	newsVote,
	update,
	remove
};
