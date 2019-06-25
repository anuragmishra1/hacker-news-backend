'use strict';

const Models = require('../Models');

module.exports = function (model) {
	const module = {};

	module.find = async (criteria, projection, options) => {
		options.lean = true;
		return await Models[model].find(criteria, projection, options);
	};

	module.findOne = async (criteria, projection, options) => {
		options.lean = true;
		return await Models[model].findOne(criteria, projection, options);
	};

	module.create = async (objToSave) => {
		const data = await new Models[model](objToSave).save();
		return data.toObject();
	};

	module.update = async (criteria, dataToSet, options) => {
		options.lean = true;
		options.new = true;
		return await Models[model].findOneAndUpdate(criteria, dataToSet, options);
	};

	module.deleteOne = async (criteria) => {
		return await Models[model].deleteOne(criteria);
	};

	return module;
};
