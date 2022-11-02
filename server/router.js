const messageHandling = require('./messageHandling');

function route(pathName, handle, response, parameter, body) {
    if (handle[pathName[1]] && typeof handle[pathName[1]][pathName[2]] === 'function')
        handle[pathName[1]][pathName[2]](response, parameter, body);
    else {
        messageHandling.sendMessage.message = messageHandling.message.notFound;
        messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), response);
    }
}

exports.route = route;