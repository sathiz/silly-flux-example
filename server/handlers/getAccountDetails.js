module.exports = function (request, reply) {
	reply({
		id: 10000,
		name: 'Account 10000',
		domainName: 'account10000.mindflash.com',
		owner: 'owner@domain10000.com'
	});
};
