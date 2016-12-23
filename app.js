'use strict';

let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 8080));


const EMPLOYEES_INTENT = 'input.employees';

app.post('/webhook', function (req, res) {
	const assistant = new ApiAiAssistant({request: req, response: res});
	console.log("Assistant Created"); 
	let actionMap = new Map();
	actionMap.set(EMPLOYEES_INTENT, employeeIntent);
	console.log("About to Handle Request"); 
	console.log(req.body); 
	assistant.handleRequest(actionMap);
	console.log("Request Handled"); 
});

function employeeIntent (assistant) {
	console.log("In Employee Intent"); 
    var newurl = 'http://api.namegame.willowtreemobile.com/';
    var request = require('request');
	request(newurl, function (error, response, body) {
		console.log("got response back"); 
  		if (!error && response.statusCode == 200) {
    		console.log(body) 
    		var num = Object.keys(d.shareInfo[i]).length;
        	assistant.tell("The number of employees at WillowTree is %s", num);
  		}
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