const dgram = require('node:dgram');
const split = require('split');
const { Readable } = require('stream');

// Create a UDP server
const server = dgram.createSocket('udp4');

// Function to create a Readable stream from UDP messages
function createUdpStream() {
	const udpStream = new Readable({
		read() { } // The _read method is a no-op
	});

	server.on('message', (msg) => {
		udpStream.push(msg.toString()); // Push received message to the stream
	});

	return udpStream;
}

// Function to handle UDP data stream
function datastream(port, address, onDataReceived) {
	const udpStream = createUdpStream();

	// Pipe the UDP stream through split and handle the split data
	udpStream.pipe(split()).on('data', data => {
		onDataReceived(data);
	});

	server.on('error', (err) => {
		console.error(`server error:\n${err.stack}`);
		server.close();
	});

	server.on('listening', () => {
		const addressInfo = server.address();
		console.log(`server listening ${addressInfo.address}:${addressInfo.port}`);
	});

	server.bind({
		address: address,
		port: port
	});
};

module.exports = datastream;
