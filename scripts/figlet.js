const
	figlet = require('figlet');

var phrase = process.argv.splice(2).join(' ').replace(/^@@head /, '');

figlet(phrase, {font: "Georgia11"}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
