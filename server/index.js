let server = require('./server');
let router = require('./router');
let requestHandler = require('./requestHandlers');

let handle = {};
handle['dataService'] = {};
handle['dataService']['login'] = requestHandler.login;
handle['dataService']['signup'] = requestHandler.signUp;
handle['dataService']['current-user'] = requestHandler.currentUser;
handle['dataService']['edit-user'] = requestHandler.editUser;
handle['dataService']['DELETE'] = requestHandler.delData;

server.start(router.route, handle);