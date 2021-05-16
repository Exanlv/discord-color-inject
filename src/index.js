const fs = require('fs');
const WebSocket = require('ws');
const fetch = require('node-fetch');

(async() => {
    const webSocketDebuggerUrl = await getWebsocketUrl();

    const ws = new WebSocket(webSocketDebuggerUrl, { perMessageDeflate: false });

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

function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

async function getWebsocketUrl() {
    try {
        const windowsData = await (await fetch('http://localhost:31337/json/list')).json();

        const validStarts = ['https://discord.com/store', 'https://discord.com/library', 'https://discord.com/channels'];
    
        const windowData = windowsData.find((wd) => {
            for (let i in validStarts)
                if (wd.url.startsWith(validStarts[i]))
                    return true;
        });
    
        if (!windowData) {
            exitIfNecessary();
    
            await sleep(3000);
    
            return getWebsocketUrl();
        }
    
        return windowData.webSocketDebuggerUrl;
    } catch (e) {
        exitIfNecessary();

        await sleep(3000);
    
        return getWebsocketUrl();
    }
}

function exitIfNecessary() {
    if (process.uptime > 60) {
        console.log('Unable to find correct discord window, exiting...');
        process.exit(1);
    }
}
