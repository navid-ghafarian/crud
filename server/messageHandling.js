//Message Handling

const message = {
    notFound: 'شناسه یافت نشد.',
    dataSaved: 'ثبت‌نام با موفقیت انجام شد.',
    loginFailed: 'نام‌کاربری یا رمزعبور اشتباه است.',
    logged: 'ورود با موفقیت انجام شد.',
    dataUpdate: 'داده با موفقیت بروزرسانی شد.',
    dataDelete: 'شناسه پاک شد.',
    duplicateData: 'شناسه تکراری است.',
    validateData: 'یکی دو مورد جا انداختی :)',
}

let sendMessage = {
    message: ''
}

function messageHandling(status, message, response) {
    response.writeHead(status, { "Content-Type": "application/json" });
    response.write(message);
    response.end();
}

module.exports = {
    messageHandling,
    message,
    sendMessage
}