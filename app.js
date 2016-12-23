'use strict';

let ApiAiAssistant = require('actions-on-google').ApiAiAssistant;
let express = require('express')
let app = express()
let bodyParser = require('body-parser');
app.set('port', (process.env.PORT || 8080));


const EMPLOYEES_INTENT = 'input.employees';

app.post('/webhook', function (request, response) {
	const assistant = new ApiAiAssistant({request: request, response: response});

	function responseHandler (assistant) {
        let intent = assistant.getIntent();
        switch (intent) {
            case EMPLOYEES_INTENT:
                let newurl = 'http://api.namegame.willowtreemobile.com/';
                let request = require('request');
                request(newurl, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        console.log(Object.keys(body).length);
                        var num = Object.keys(body).length;
                        assistant.tell("The number of employees at WillowTree is %s", num);
                    }
                });
            break;
    }
    assistant.handleRequest(responseHandler);
}
assistant.handleRequest(responseHandler);
	console.log("Request Handled"); 
});

// function employeeIntent (assistant) {
// 	console.log("In Employee Intent"); 
//     let newurl = 'http://api.namegame.willowtreemobile.com/';
//     let request = require('request');
// 	request(newurl, function (error, response, body) {
// 		console.log("got response back"); 
//   		if (!error && response.statusCode == 200) {
//     		console.log(body) 
//     		var num = Object.keys(d.shareInfo[i]).length;
//         	assistant.tell("The number of employees at WillowTree is %s", num);
//   		}
// 	});
// }


app.post('/', function (request, response) {
	// const assistant = new ApiAiAssistant({request: request, response: response});
	// assistant.tell("You're in the wrong place.");
});

let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});