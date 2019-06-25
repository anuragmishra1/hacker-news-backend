'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema({
	title: { type: String, trim: true, required: true },
	url: { type: String, trim: true, required: true },
	up_vote: { type: Number, default: 0 },
	down_vote: { type: Number, default: 0 }
}, {
		timestamps: { createdAt: 'created_on', updatedAt: 'modified_on' }
	}
);

module.exports = mongoose.model('News', News);
