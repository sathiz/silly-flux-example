module.exports = {
	getWith: function (object, attr) {
		return function () {
			return object[attr];
		}
	}
};
