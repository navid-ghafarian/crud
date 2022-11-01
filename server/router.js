const messageHandling = require('./messageHandling');

function route(pathName, handle, res, method, parametrId, body) {
    if (handle[pathName] !== undefined && typeof handle[pathName][method] === 'function')
        handle[pathName][method](res, parametrId, body);
    else {
        messageHandling.sendMessage.message = messageHandling.message.notFound;
        messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), res);
    }
}

exports.route = route;