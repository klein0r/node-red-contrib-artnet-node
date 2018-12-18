module.exports = function(RED) {

    "use strict";
    const artnet = require('artnet');

    function ArtNetNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        var artnetConnection = new artnet({host: config.host, port: parseInt(config.port, 10) || 6454});
    }

    RED.nodes.registerType('artnet-node', ArtNetNode);

    function ArtNetCommand(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }

    RED.nodes.registerType('artnet-command', ArtNetCommand);
}