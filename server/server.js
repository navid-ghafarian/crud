let http = require('http');
let url = require('url');

const hostname = '127.0.0.1';
const port = 81;

function start(route, handle) {

    function onRequest(req, res) {

        let pathName = url.parse(req.url).pathname,
            parameter = url.parse(req.url, true).query,
            parametrId = parameter.id,
            body = '',
            method = req.method;


        req.on('data', function (data) {
            body += data;
        });

        req.on('end', async function () {

            if (body) {
                body = JSON.parse(body);
                if (body.args) {
                    body = body.args
                }
            }

            route(pathName, handle, res, method, parametrId, body);

        });
    }

    http.createServer(onRequest).listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
}

exports.start = start;