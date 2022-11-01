const messageHandling = require('./messageHandling');

//Validate
async function validate(data, response) {

    if (!!data.username || (!!data || Object.keys(data).length !== 0) || !!data.parent) return true;

    messageHandling.sendMessage.message = messageHandling.message.validateData;
    messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), response);
    return false;
}

exports.validate = validate;