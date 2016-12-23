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

	function responseHandler (assistant) {
        let intent = assistant.getIntent();
        switch (intent) {
            case EMPLOYEES_INTENT:
                let newurl = 'http://api.namegame.willowtreemobile.com/';
                let request = require('request');
                return request(newurl, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        console.log(body.length);
                        var obj = JSON.parse(json);
                        var length = Object.keys(obj).length;
                        console.log(length);
                        var num = body.length;
                        assistant.tell("The number of employees at WillowTree is " + num);
                    }
                });
        }
    }
    assistant.handleRequest(responseHandler);
});

let server = app.listen(app.get('port'), function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});