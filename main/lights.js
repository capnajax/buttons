
const
	axios = require('axios'),
	https = require('https'),
	YAML = require('yamljs'),
	_ = require('lodash'),

	HUE_BASEPATH = '<%= address %>/api/<%= key %>/'

	PATHS = {
		lights: {
			hue: {
				verb: 'GET',
				path: _.template(HUE_BASEPATH+'lights'),
				body: null,
				options: {
					httpsAgent: new https.Agent({
					    	rejectUnauthorized: false
					    })
				}
			}
		},
		groups: {
			hue: {
				verb: 'GET',
				path: _.template(HUE_BASEPATH+'groups'),
				body: null,
				options: {
					httpsAgent: new https.Agent({
					    	rejectUnauthorized: false
					    })
				}
			}
		},
		schedules: {
			hue: {
				verb: 'GET',
				path: _.template(HUE_BASEPATH+'schedules'),
				body: null,
				options: {
					httpsAgent: new https.Agent({
					    	rejectUnauthorized: false
					    })
				}
			}
		},
		scenes: {
			hue: {
				verb: 'GET',
				path: _.template(HUE_BASEPATH+'scenes'),
				body: null,
				options: {
					httpsAgent: new https.Agent({
					    	rejectUnauthorized: false
					    })
				}
			}
		},
		off: {
			hue: {
				verb: 'PUT',
				path: _.template(HUE_BASEPATH+'lights/<%= lightId %>/state'),
				body: '{"on":false}',
				options: {
					httpsAgent: new https.Agent({
					    	rejectUnauthorized: false
					    })
				}
			}
		},
		on: {
			hue: {
				verb: 'PUT',
				path: _.template(HUE_BASEPATH+'lights/<%= lightId %>/state'),
				body: '{"on":true}',
				options: {
					httpsAgent: new https.Agent({
					    	rejectUnauthorized: false
					    })
				}
			}
		}
	}

	secrets = YAML.load('./main/secrets.yaml');

function getData(type, options) {

	var bases = [],
		promises = [];

	secrets.lights.bases.forEach(base => {

		let path = PATHS[type][base.type],
			requestSpec = _.extend({},
				path.options,
				{
					method: path.verb,
					url: path.path,
					data: path.body
				}),
			templateP = null,
			templateParams = () => {
					return (templateP || (templateP = _.defaults({}, base, options)));
				};

		// console.log('templateParams', templateParams());
		// console.log('templateParams', templateParams());

		['url', 'body'].forEach(p => {
			if (_.isFunction(requestSpec[p])) {
				requestSpec[p] = requestSpec[p](templateParams());
			}
		});

		console.log('requestSpec', requestSpec);

		promises.push(axios(requestSpec));

	});

	return axios.all(promises)
}

function startup() { 

	const apis = ['lights', 'groups', 'schedules', 'scenes'];

	var promises = [];

	apis.forEach(api => promises.push(getData(api)));

	Promise.all(promises)
	.then(calls => {
		calls.forEach((t,i) => {
			console.log();
			console.log(`**** ${apis[i]}: `);
			t.forEach(response => {
				console.log(response.data);
			});
		})
	});

}

function lightsOff() {

	console.log('lightsoff');

	getData('off', {lightId: 13});
	getData('off', {lightId: 14});
	getData('off', {lightId: 15});

}

function lightsOn() {

	console.log('lightsoff');

	getData('on', {lightId: 13});
	getData('on', {lightId: 14});
	getData('on', {lightId: 15});

}

module.exports = {
	lightsOff,
	lightsOn
}

startup();
