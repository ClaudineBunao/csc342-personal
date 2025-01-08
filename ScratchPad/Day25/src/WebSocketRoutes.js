//new Express router called websocketRouter Import and attach the router to the existing router in routes.js file.
const express = require('express');
// const expressWs = require('express-ws');
const websocketRouter = express.Router();

//constant called messages to store the chat messages in the system and initialize it to an empty array.
const messages = [];
const clients = new Set();

function sendPacket(ws, label, data) {
    let packet = {
        label: label, //This will identify the nature of the data
        data: data,
    }
    ws.send(JSON.stringify(packet));
};

websocketRouter.ws('/ws', (ws, req) => {
    clients.add(ws);
    console.log('Client connected');
    sendPacket(ws, 'init', messages);

    ws.on('close', e => {
        clients.delete(ws);
        console.log('Client disconnected');
    });

    ws.on('message', (msg) => {
        const packet = JSON.parse(msg);
        switch (packet.label) {
            case 'chat':
                messages.push(packet.data);
                clients.forEach((client) => {
                    if (client !== ws) {
                        client.send(msg);
                    } //Don't send the message back to the sender
                });
                break;
        }
    });

});

module.exports = websocketRouter;