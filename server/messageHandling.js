//Message Handling

const message = {
    notFound: 'شناسه یافت نشد.',
    dataSaved: 'داده‌ها با موفقیت در دیتابیس ذخیره شد.',
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