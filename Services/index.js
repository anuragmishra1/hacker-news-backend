'use strict';

module.exports = {
	Users: require('./DbWrapper')('Users'),
	News: require('./DbWrapper')('News')
};
