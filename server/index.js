let server = require('./server');
let router = require('./router');
let requestHandler = require('./requestHandlers');

let handle = {};
handle['/dataService'] = {};
handle['/dataService']['POST'] = requestHandler.signUp;
handle['/dataService']['GET'] = requestHandler.getData;
handle['/dataService']['PUT'] = requestHandler.updateData;
handle['/dataService']['DELETE'] = requestHandler.delData;

server.start(router.route, handle);