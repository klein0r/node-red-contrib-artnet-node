module.exports = function(RED) {

    "use strict";
    const ArtNetClient = require('./lib/artnet-client.js');

    function ArtNetNode(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.client = ArtNetClient.createClient(config.host, config.port || 6454, config.universe);

        node.transitionsMap = {};
        node.closeCallbacksMap = {};
        node.nodeData = node.context().get('nodeData') || [];

        node.sendData = function () {
            node.client.send(node.nodeData);
        };

        // Save current states to context
        node.saveDataToContext = function () {
            node.context().set('nodeData', node.nodeData);
        };

        node.setChannelValue = function (channel, value) {
            node.setCh(channel, value, 0, 0);
            node.sendData();
        };

        node.setCh = function (address, value, transition, transitionTime) {
            if (address > 0) {
                if (transition) {
                    node.addTransition(address, transition, value); // TODO move to input
                    node.fadeToValue(address, parseInt(value), transitionTime);
                } else {
                    node.nodeData[address - 1] = parseInt(value);
                }
            }
        };

        node.getCh = function (address) {
            return parseInt(node.nodeData[address - 1] || 0);
        };

        node.clearTransitions = function () {
            for (var channel in node.transitionsMap) {
                if (node.transitionsMap.hasOwnProperty(channel)) {
                    node.clearTransition(channel);
                }
            }

            node.transitionsMap = {};
            node.closeCallbacksMap = {};
        };

        node.clearTransition = function (channel, skipDataSending) {
            var transition = node.transitionsMap[channel];
            // cancel all timeouts
            if (transition && transition.timeouts) {
                for (var i = 0; i < transition.timeouts.length; i++) {
                    clearTimeout(transition.timeouts[i]);
                }
                transition.timeouts.length = 0;
            }
            // finish transition immediately
            if (node.closeCallbacksMap.hasOwnProperty(channel)) {
                node.closeCallbacksMap[channel]();
                // skip data sending if we have start_buckets in payload
                if (!skipDataSending) {
                    node.sendData();
                }
                delete node.closeCallbacksMap[channel];
            }
            // remove transition from map
            delete node.transitionsMap[channel];
        };

        node.addTransition = function (channel, transition, value) {
            node.clearTransition(channel);
            var transitionItem = {"transition": transition, "timeouts": []};
            if (value) {
                transitionItem.value = parseInt(value);
            }
            node.transitionsMap[channel] = transitionItem;
        };

        node.addTransitionTimeout = function (channel, timeoutId) {
            var transition = node.transitionsMap[channel];
            if (transition) {
                transition.timeouts.push(timeoutId);
            }
        };

        node.fadeToValue = function (channel, newValue, transitionTime) {
            node.log('fading ' + channel + ' to ' + newValue);

            var oldValue = node.getCh(channel);
            var steps = transitionTime / 10;

            // calculate difference between new and old values
            var diff = Math.abs(oldValue - newValue);
            if (diff / steps <= 1) {
                steps = diff;
            }
            // should we fade up or down?
            var direction = (newValue > oldValue);

            var valuePerStep = diff / steps;
            var timePerStep = transitionTime / steps;

            var timeoutId;

            for (var i = 1; i < steps; i++) {
                var valueStep = direction === true ? valuePerStep : -valuePerStep;
                var iterationValue = oldValue + i * valueStep;

                // create time outs for each step
                timeoutId = setTimeout(function (val) {
                    node.setChannelValue(channel, Math.round(val));
                }, i * timePerStep, iterationValue);

                node.addTransitionTimeout(channel, timeoutId);
            }

            // add close callback to set channels to newValue in case redeploy and all timeouts stopping
            node.closeCallbacksMap[channel] = (function () {
                node.setCh(channel, newValue);
            });

            timeoutId = setTimeout(function () {
                node.setChannelValue(channel, newValue);
                node.clearTransition(channel);
            }, transitionTime);

            node.addTransitionTimeout(channel, timeoutId);
        };

        node.on('close', function (done) {
            node.clearTransitions();
            node.saveDataToContext();
        });
    }

    RED.nodes.registerType('artnet-node', ArtNetNode);

    function ArtNetCommand(config) {
        RED.nodes.createNode(this, config);

        var node = this;
        node.artnetnode = RED.nodes.getNode(config.artnetnode);

        node.on('input', function(msg) {
            if (node.artnetnode) {
                var payload = msg.payload;

                var transition = payload.transition;
                var duration = parseInt(payload.duration || 0);

                if (payload.start_buckets && Array.isArray(payload.start_buckets)) {
                    for (var i = 0; i < payload.start_buckets.length; i++) {
                        node.artnetnode.clearTransition(payload.start_buckets[i].channel, true);
                        node.artnetnode.setCh(payload.start_buckets[i].channel, payload.start_buckets[i].value);
                    }
                    node.artnetnode.sendData();
                }

                if (payload.channel) {
                    node.artnetnode.setCh(payload.channel, payload.value, transition, duration);
                    node.artnetnode.sendData();
                } else if (Array.isArray(payload.buckets)) {
                    for (var i = 0; i < payload.buckets.length; i++) {
                        node.artnetnode.clearTransition(payload.buckets[i].channel, true);
                        node.artnetnode.setCh(payload.buckets[i].channel, payload.buckets[i].value, transition, duration);
                    }
                    if (!transition) {
                        node.artnetnode.sendData();
                    }
                } else {
                    node.error('Invalid payload');
                }
            }
        });
    }

    RED.nodes.registerType('artnet-command', ArtNetCommand);
}