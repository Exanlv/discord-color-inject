const fs = require('fs');
const WebSocket = require('ws');
const fetch = require('node-fetch');

(async() => {
    const windowData = await (await fetch('http://localhost:31337/json/list')).json();

    const ws = new WebSocket(windowData[0].webSocketDebuggerUrl, { perMessageDeflate: false });

    await new Promise(resolve => ws.once('open', resolve));

    ws.on('message', async(msg) => {
        const message = JSON.parse(msg);

        switch (message.id) {
            case 1:
                ws.send(JSON.stringify({
                    id: 2,
                    method: 'Runtime.evaluate',
                    params: {
                        expression: fs.readFileSync(__dirname + '/inject/loadCss.js').toString()
                    },
                }));
                break;
            case 2:
                process.exit();
        }
    });

    ws.send(JSON.stringify({
        id: 1,
        method: 'Runtime.evaluate',
        params: {
            expression: 'var css = ' + JSON.stringify(fs.readFileSync(__dirname + '/inject/css.css').toString())
        }
    }))
})();