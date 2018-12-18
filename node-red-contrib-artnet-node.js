module.exports = function(RED) {

    "use strict";
    const artnet = require('artnet');

    function ArtNetNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;

        this.on('close', function (done) {
            
        });
    }

    RED.nodes.registerType('artnet-node', ArtNetNode);

    function ArtNetCommand(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.artnetnode = RED.nodes.getNode(config.artnetnode);

        node.on('input', function(msg) {
            if (node.artnetnode) {
                
            }
        });
    }

    RED.nodes.registerType('artnet-command', ArtNetCommand);
}