'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
	first_name: { type: String, trim: true, required: true },
	last_name: { type: String, trim: true, required: true },
	email: { type: String, trim: true, index: true, unique: true, required: true },
	password: { type: String, trim: true, required: true },
	access_token: { type: String, trim: true, default: null }
}, {
		timestamps: { createdAt: 'created_on', updatedAt: 'modified_on' }
	}
);

module.exports = mongoose.model('Users', Users);
