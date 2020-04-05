
const
	app = require('electron').app,
	main = require('electron').remote.require('../main/lights.js');

function lightsOff() {

	main.lightsOff();

}

document.getElementById('lights-pane-off').addEventListener('click', function() {
	main.lightsOff();
});

document.getElementById('lights-pane-on').addEventListener('click', function() {
	main.lightsOn();
});


// $('.lights-pane #lights-pane-off').click(function() {
// 	main.lightsOff();
// 	console.log('click');
// });

