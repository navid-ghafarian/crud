const Redis = require('ioredis');
const redis = new Redis();
const defaultDB = 1;
redis.select(defaultDB);

const messageHandling = require('./messageHandling');
const validate = require('./validate');

//login
async function login(response, parametrId, body) {

    let keys = await redis.keys(body.username);
    if (Object.keys(keys).length === 0) {
        messageHandling.sendMessage.message = messageHandling.message.loginFailed;
        messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), response);
        return;
    }

    await redis.select(1);
    redis.get(body.username, (err, key) => {
        let password = JSON.parse(key).signupData.password;
        if (password === body.password) {
            messageHandling.sendMessage.message = messageHandling.message.logged;
            messageHandling.messageHandling(200, JSON.stringify(messageHandling.sendMessage), response);
        } else {
            messageHandling.sendMessage.message = messageHandling.message.loginFailed;
            messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), response);
        }
    });

    return;

}

//signUp
async function signUp(response, parameter, body) {

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

//current user
async function currentUser(response, parametrId, body) {

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

    return;

}

//edit user
async function editUser(response, parametrId, body) {

    let id, parent, data;

    id = body.username;
    parent = body.parent;
    data = JSON.stringify(body.signupData);

    const getValidate = await validate.validate(data, response);
    if (!getValidate) return;

    let keys = await redis.keys(id);
    if (Object.keys(keys).length === 0) {
        messageHandling.sendMessage.message = messageHandling.message.notFound;
        messageHandling.messageHandling(404, JSON.stringify(messageHandling.sendMessage), response);
        return;
    }

    await redis.select(1);
    redis.set(id, data, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataUpdate;
        messageHandling.messageHandling(200, JSON.stringify(messageHandling.sendMessage), response);
    });

    await redis.select(2);
    redis.set(id, parent, () => {
        messageHandling.sendMessage.message = messageHandling.message.dataUpdate;
        messageHandling.messageHandling(200, JSON.stringify(messageHandling.sendMessage), response);
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
    login,
    signUp,
    currentUser,
    editUser,
    getData,
    delData
}