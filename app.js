'use strict';

let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
var express = require('express')
var app = express()
app.set('port', (process.env.PORT || 8080));


const EMPLOYEES_INTENT = 'input.employees';

app.post('/webhook', function (request, response) {
	const assistant = new ApiAiAssistant({request: request, response: response});
	assistant.tell("The number of employees at WillowTree is 18,983");
	let actionMap = new Map();
	actionMap.set(EMPLOYEES_INTENT, employeeIntent);
	assistant.handleRequest(actionMap);
});

function employeeIntent (assistant) {
  assistant.ask("The number of employees at WillowTree is 18,983");
}


app.post('/', function (request, response) {
	// const assistant = new ApiAiAssistant({request: request, response: response});
	// assistant.tell("You're in the wrong place.");
});

let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});