'use strict';

let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 8080));


const EMPLOYEES_INTENT = 'input.employees';

app.post('/webhook', function (request, response) {
	const assistant = new ApiAiAssistant({request: request, response: response});
	let actionMap = new Map();
	actionMap.set(EMPLOYEES_INTENT, employeeIntent);
	assistant.handleRequest(actionMap);
});

function employeeIntent (assistant) {
    var newurl = 'http://api.namegame.willowtreemobile.com/';
    var https = require('https');
	var optionsget = {
    	host : 'api.namegame.willowtreemobile.com',
    	port : 443,
		method : 'GET' // do GET
	};
	var reqGet = https.request(optionsget, function(res) {
    	console.log("statusCode: ", res.statusCode);
    	res.on('data', function(d) {
        	console.info('GET result:\n');
        	process.stdout.write(d);
        	var num = Object.keys(d.shareInfo[i]).length;
        	assistant.tell("The number of employees at WillowTree is %s", num);
    	});	
	});	
}


app.post('/', function (request, response) {
	// const assistant = new ApiAiAssistant({request: request, response: response});
	// assistant.tell("You're in the wrong place.");
});

let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});