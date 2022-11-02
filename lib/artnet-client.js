var dgram = require('dgram');
var Buffer = require('buffer').Buffer;

function ArtNetClient(host, port, universe) {
	this._host = host;
	this._port = port;
	this._socket = dgram.createSocket("udp4");
	this.HEADER = [65, 114, 116, 45, 78, 101, 116, 0, 0, 80, 0, 14]; // 0 - 11
	this.SEQUENCE = [0]; // 12
	this.PHYSICAL = [0]; // 13
	this.UNIVERSE = [universe, 0]; // 14 - 15
}
exports.ArtNetClient = ArtNetClient;

exports.createClient = function(host, port, universe) {
	return new ArtNetClient(host, port, universe);
}

ArtNetClient.prototype.send = function(data) {
	// Calcualte the length
	var length_upper = Math.floor(data.length / 256);
	var length_lower = data.length % 256;

	var data = this.HEADER.concat(this.SEQUENCE).concat(this.PHYSICAL).concat(this.UNIVERSE).concat([length_upper, length_lower]).concat(data);
	var buf = Buffer(data);
	this._socket.send(buf, 0, buf.length, this._port, this._host, function(){});
}

ArtNetClient.prototype.close = function(){
	this._socket.close();
};
