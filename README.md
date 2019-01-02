# node-red-contrib-artnetnode

Node-RED node that controls lights via artnet

Based on

- [gunnebo artnet](https://github.com/gunnebo-ab/node-red-contrib-artnet)
- and [BrianMMcClain's Artnet Node Client](https://github.com/BrianMMcClain/artnet-node).

## Installation

Run the following command in the root directory of your Node-RED install. Usually this is `~/.node-red`

```
npm install node-red-contrib-artnet-node
```

## Example Flow

- Configure the IP address of the ArtNet node
- Connect a DMX slave starting at address 1
- Connect RGB stripes or other lights to the first 7 channels
- Play around with the flow below by injecting the messages

```
[
    {
        "id": "5e9f7365.11221c",
        "type": "tab",
        "label": "DMX",
        "disabled": false,
        "info": ""
    },
    {
        "id": "71fa2812.6cab58",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1 to 255",
        "topic": "",
        "payload": "{\"channel\":1,\"value\":255}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 340,
        "y": 120,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "29b42bbe.3abfe4",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1-3 to 255",
        "topic": "",
        "payload": "{\"buckets\":[{\"channel\":1,\"value\":255},{\"channel\":2,\"value\":255},{\"channel\":3,\"value\":255}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 350,
        "y": 440,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "e8b38c5b.b94bd",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1 to 255 (trans)",
        "topic": "",
        "payload": "{\"transition\":\"linear\",\"duration\":2000,\"buckets\":[{\"channel\":1,\"value\":255}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 360,
        "y": 280,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "b777ef73.778f9",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1-3 to 0",
        "topic": "",
        "payload": "{\"buckets\":[{\"channel\":1,\"value\":0},{\"channel\":2,\"value\":0},{\"channel\":3,\"value\":0}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 340,
        "y": 480,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "cb20bde5.517a6",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1 to 0",
        "topic": "",
        "payload": "{\"channel\":1,\"value\":0}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 330,
        "y": 160,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "ee4b72a1.12d15",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1 to 0 (trans)",
        "topic": "",
        "payload": "{\"transition\":\"linear\",\"duration\":2000,\"buckets\":[{\"channel\":1,\"value\":0}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 350,
        "y": 320,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "bef3bdc9.f8adc",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1-3 to 255 (trans)",
        "topic": "",
        "payload": "{\"transition\":\"linear\",\"duration\":2000,\"buckets\":[{\"channel\":1,\"value\":255},{\"channel\":2,\"value\":255},{\"channel\":3,\"value\":255}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 370,
        "y": 600,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "271945e.0bf73ba",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1-3 to 0 (trans)",
        "topic": "",
        "payload": "{\"transition\":\"linear\",\"duration\":2000,\"buckets\":[{\"channel\":1,\"value\":0},{\"channel\":2,\"value\":0},{\"channel\":3,\"value\":0}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 360,
        "y": 640,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "564c5343.5b041c",
        "type": "artnet-command",
        "z": "5e9f7365.11221c",
        "name": "",
        "artnetnode": "969ef717.164118",
        "x": 990,
        "y": 440,
        "wires": []
    },
    {
        "id": "ba286958.3a9478",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 340,
        "y": 800,
        "wires": [
            [
                "172ea5ba.103daa"
            ]
        ]
    },
    {
        "id": "172ea5ba.103daa",
        "type": "function",
        "z": "5e9f7365.11221c",
        "name": "Fade 1,2,3",
        "func": "msg.payload = {\n    transition: \"linear\",\n    duration: 2000,\n    buckets: [\n        {\n            channel: 1,\n            value: 255,\n            delay: 0\n        },\n        {\n            channel: 2,\n            value: 255,\n            delay: 1000\n        },\n        {\n            channel: 3,\n            value: 255,\n            delay: 2000\n        }\n    ]\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 530,
        "y": 800,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "c86bca04.b14748",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1 to 255 + delay",
        "topic": "",
        "payload": "{\"channel\":1,\"value\":255,\"delay\":1000}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 360,
        "y": 200,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "c893d300.205eb",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1 to 255 (trans) + delay",
        "topic": "",
        "payload": "{\"transition\":\"linear\",\"duration\":2000,\"delay\":1000,\"buckets\":[{\"channel\":1,\"value\":255}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 380,
        "y": 360,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "96debc06.13bbe",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1-3 to 255 + delay",
        "topic": "",
        "payload": "{\"delay\":1000,\"buckets\":[{\"channel\":1,\"value\":255},{\"channel\":2,\"value\":255},{\"channel\":3,\"value\":255}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 370,
        "y": 520,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "55f55bf8.655034",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1-3 to 255 (trans) + delay",
        "topic": "",
        "payload": "{\"transition\":\"linear\",\"duration\":2000,\"delay\":1000,\"buckets\":[{\"channel\":1,\"value\":255},{\"channel\":2,\"value\":255},{\"channel\":3,\"value\":255}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 390,
        "y": 680,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "d9a98108.0e891",
        "type": "function",
        "z": "5e9f7365.11221c",
        "name": "Fade 1-7",
        "func": "var $brightness = 50;\nmsg.payload = {\n    transition: \"linear\",\n    duration: 2000,\n    buckets: [\n        {\n            channel: 1,\n            value: $brightness,\n            delay: 0\n        },\n        {\n            channel: 2,\n            value: $brightness,\n            delay: 1000\n        },\n        {\n            channel: 3,\n            value: $brightness,\n            delay: 2000\n        },\n        {\n            channel: 4,\n            value: $brightness,\n            delay: 3000\n        },\n        {\n            channel: 5,\n            value: $brightness,\n            delay: 4000\n        },\n        {\n            channel: 6,\n            value: $brightness,\n            delay: 5000\n        },\n        {\n            channel: 7,\n            value: $brightness,\n            delay: 6000\n        }\n    ]\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 520,
        "y": 840,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "806a8e0a.8d10d",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "",
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 340,
        "y": 840,
        "wires": [
            [
                "d9a98108.0e891"
            ]
        ]
    },
    {
        "id": "5d7a3901.1a61d8",
        "type": "inject",
        "z": "5e9f7365.11221c",
        "name": "1-7 to 0 (trans)",
        "topic": "",
        "payload": "{\"transition\":\"linear\",\"duration\":2000,\"buckets\":[{\"channel\":1,\"value\":0},{\"channel\":2,\"value\":0},{\"channel\":3,\"value\":0},{\"channel\":4,\"value\":0},{\"channel\":5,\"value\":0},{\"channel\":6,\"value\":0},{\"channel\":7,\"value\":0}]}",
        "payloadType": "json",
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "x": 360,
        "y": 720,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "4969182f.57b4e8",
        "type": "ui_slider",
        "z": "5e9f7365.11221c",
        "name": "",
        "label": "Alle",
        "group": "ad327c32.5d84",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "topic": "",
        "min": 0,
        "max": "255",
        "step": 1,
        "x": 330,
        "y": 900,
        "wires": [
            [
                "9b769641.66c858"
            ]
        ]
    },
    {
        "id": "9b769641.66c858",
        "type": "function",
        "z": "5e9f7365.11221c",
        "name": "Fade 1-7",
        "func": "var $brightness = msg.payload;\nmsg.payload = {\n    buckets: [\n        {\n            channel: 1,\n            value: $brightness\n        },\n        {\n            channel: 2,\n            value: $brightness\n        },\n        {\n            channel: 3,\n            value: $brightness\n        },\n        {\n            channel: 4,\n            value: $brightness\n        },\n        {\n            channel: 5,\n            value: $brightness\n        },\n        {\n            channel: 6,\n            value: $brightness\n        },\n        {\n            channel: 7,\n            value: $brightness\n        }\n    ]\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 520,
        "y": 900,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "3b20c378.bcc95c",
        "type": "ui_colour_picker",
        "z": "5e9f7365.11221c",
        "name": "",
        "label": "Stripe 1",
        "group": "ad327c32.5d84",
        "format": "rgb",
        "outformat": "object",
        "showSwatch": true,
        "showPicker": false,
        "showValue": false,
        "showHue": false,
        "showAlpha": false,
        "showLightness": true,
        "dynOutput": "false",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "topic": "",
        "x": 320,
        "y": 940,
        "wires": [
            [
                "d8e3cf76.94463"
            ]
        ]
    },
    {
        "id": "d8e3cf76.94463",
        "type": "function",
        "z": "5e9f7365.11221c",
        "name": "1-3 to color",
        "func": "msg.payload = {\n    buckets: [\n        {\n            channel: 1,\n            value: msg.payload.r\n        },\n        {\n            channel: 2,\n            value: msg.payload.g\n        },\n        {\n            channel: 3,\n            value: msg.payload.b\n        },\n    ]\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 540,
        "y": 940,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "5ffea048.24cb9",
        "type": "ui_colour_picker",
        "z": "5e9f7365.11221c",
        "name": "",
        "label": "Stripe 2",
        "group": "ad327c32.5d84",
        "format": "rgb",
        "outformat": "object",
        "showSwatch": true,
        "showPicker": false,
        "showValue": false,
        "showHue": false,
        "showAlpha": false,
        "showLightness": true,
        "dynOutput": "false",
        "order": 0,
        "width": 0,
        "height": 0,
        "passthru": true,
        "topic": "",
        "x": 320,
        "y": 980,
        "wires": [
            [
                "169e2cc5.389543"
            ]
        ]
    },
    {
        "id": "169e2cc5.389543",
        "type": "function",
        "z": "5e9f7365.11221c",
        "name": "4-6 to color",
        "func": "msg.payload = {\n    buckets: [\n        {\n            channel: 4,\n            value: msg.payload.r\n        },\n        {\n            channel: 5,\n            value: msg.payload.g\n        },\n        {\n            channel: 6,\n            value: msg.payload.b\n        },\n    ]\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 540,
        "y": 980,
        "wires": [
            [
                "564c5343.5b041c"
            ]
        ]
    },
    {
        "id": "969ef717.164118",
        "type": "artnet-node",
        "z": "",
        "host": "192.168.44.13",
        "port": "6454",
        "universe": "0"
    },
    {
        "id": "ad327c32.5d84",
        "type": "ui_group",
        "z": "",
        "name": "DMX",
        "tab": "994c9c6e.133bb",
        "disp": true,
        "width": "6",
        "collapse": false
    },
    {
        "id": "994c9c6e.133bb",
        "type": "ui_tab",
        "z": "",
        "name": "Keller",
        "icon": "dashboard"
    }
]
```