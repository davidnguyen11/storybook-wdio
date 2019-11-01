const hook = require('css-modules-require-hook');
const baseUrl = 'https://webdriver.io';

exports.config = {
	runner: 'local',
	hostname: '127.0.0.1',
	port: 4444,
	specs: ['./test/specs/**/*.js'],
	exclude: [
		// 'path/to/excluded/files'
	],
	maxInstances: 1,
	capabilities: [
		{
			maxInstances: 1,
			browserName: 'chrome',
		},
	],
	sync: true,
	logLevel: 'error',
	deprecationWarnings: true,
	bail: 0,
	baseUrl: baseUrl,
	waitforTimeout: 10000,
	connectionRetryTimeout: 100,
	connectionRetryCount: 3,
	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		retries: 2,
		require: ['tsconfig-paths/register'],
	},
	before: function(capabilities, specs) {
		// require('ts-node/register');
		require('ts-node').register({ files: true });
	},
	beforeSession: function() {
		console.log('before session');
		require.extensions['.less'] = require.extensions['.less'];
		hook({
			extensions: '.less',
			generateScopedName: '[local]--[hash:base64:5]',
		});
	},
};
