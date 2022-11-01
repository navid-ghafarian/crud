const Redis = require('ioredis');
const redis = new Redis();
const defaultDB = 1;
redis.select(defaultDB);

const messageHandling = require('./messageHandling');
const validate = require('./validate');


//signUp
async function signUp(response, parametrId, body) {

    let id, parent, data;

    id = body.username;
    parent = body.parent;
    data = JSON.stringify(body.signupData);

    const getValidate = await validate.validate(data, response);
    if (!getValidate) return;

    let keys = await redis.keys(id);
    if (Object.keys(keys).length !== 0) {
        messageHandling.sendMessage.message = messageHandling.message.duplicateData;
        messageHandling.messageHandling(401, JSON.stringify(messageHandling.sendMessage), response);
        return;
    }

    await redis.select(1);
    redis.set(id, data, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataSaved;
        messageHandling.messageHandling(201, JSON.stringify(messageHandling.sendMessage), response);
    });

    await redis.select(2);
    redis.set(id, parent, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataSaved;
        messageHandling.messageHandling(201, JSON.stringify(messageHandling.sendMessage), response);
    });

    return;
}

//update user information
async function updateData(response, parametrId, body) {

    let id, parent, data;

    id = body.username;
    parent = body.parent;
    data = JSON.stringify(body.signupData);

    const getValidate = await validate.validate(data, response);
    if (!getValidate) return;

    let keys = await redis.keys(id);
    if (Object.keys(keys).length === 0) {
        messageHandling.sendMessage.message = messageHandling.message.notFound;
        messageHandling.messageHandling(401, JSON.stringify(messageHandling.sendMessage), response);
        return;
    }

    await redis.select(1);
    redis.set(id, data, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataUpdate;
        messageHandling.messageHandling(201, JSON.stringify(messageHandling.sendMessage), response);
    });

    await redis.select(2);
    redis.set(id, parent, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataUpdate;
        messageHandling.messageHandling(201, JSON.stringify(messageHandling.sendMessage), response);
    });

    return;

}

//GET
async function getData(response, parametrId, body) {

    if (parametrId) {

        let keys = await redis.keys(parametrId);
        if (Object.keys(keys).length === 0) {
            messageHandling.sendMessage.message = messageHandling.message.notFound;
            messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), response);
            return;
        }

        await redis.select(1);
        redis.get(parametrId, (err, key) => {
            messageHandling.messageHandling(200, key, response);
        });

    } else {
        await redis.select(1);
        const allKeys = await redis.keys('*');
        values = await redis.mget(allKeys);
        const lista = values.map(value => JSON.parse(value));
        messageHandling.messageHandling(200, JSON.stringify(lista), response);
    }

    return;

}

//DELETE
async function delData(response, parametrId, body) {

    parametrId = parametrId.split(",");

    // let keys = await redis.keys(parametrId);

    // if (Object.keys(keys).length === 0) {
    //     messageHandling.sendMessage.message = messageHandling.message.notFound;
    //     await messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), response);
    //     return;
    // }

    await redis.select(1);
    redis.del(parametrId, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataDelete;
        messageHandling.messageHandling(200, JSON.stringify(messageHandling.sendMessage), response);
    });

    await redis.select(2);
    redis.del(parametrId, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataDelete;
        messageHandling.messageHandling(200, JSON.stringify(messageHandling.sendMessage), response);
    });

    return;

}

module.exports = {
    signUp,
    updateData,
    getData,
    delData
}