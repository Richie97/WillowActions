'use strict';

let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
let express = require('express')
let app = express()
let bodyParser = require('body-parser');
app.set('port', (process.env.PORT || 8080));
app.use(bodyParser.json({type: 'application/json'}));


const EMPLOYEES_INTENT = 'input.employees';

app.post('/webhook', function (request, response) {
	const assistant = new ApiAiAssistant({request: request, response: response});
	console.log("Assistant Created"); 
	// let actionMap = new Map();
	// actionMap.set(EMPLOYEES_INTENT, employeeIntent);
	// console.log("About to Handle Request"); 
	// console.log(req.body); 
	// assistant.handleRequest(actionMap);

	function responseHandler (assistant) {
        // intent contains the name of the intent you defined in the Actions area of API.AI
        let intent = assistant.getIntent();
        switch (intent) {
            case EMPLOYEES_INTENT:
                let newurl = 'http://api.namegame.willowtreemobile.com/';
                let request = require('request');
                request(newurl, function (error, response, body) {
                    console.log("got response back"); 
                    if (!error && response.statusCode == 200) {
                        console.log(body) 
                        var num = Object.keys(body).length;
                        assistant.tell("The number of employees at WillowTree is %s", num);
                    }
                });
            break;
    }
    assistant.handleRequest(responseHandler);
}
// you can add the function name instead of an action map
assistant.handleRequest(responseHandler);
	console.log("Request Handled"); 
});

function employeeIntent (assistant) {
	console.log("In Employee Intent"); 
    let newurl = 'http://api.namegame.willowtreemobile.com/';
    let request = require('request');
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