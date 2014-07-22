module.exports = {
	getWith: function (attr) {
		return function (object) {
			return function() { return object[attr]; }
		}
	}
};
