const dgram = require('node:dgram');
const split = require('split');

const server = dgram.createSocket('udp4');

function datastream(port, address, data) {
	server.on('error', (err) => {
		console.error(`server error:\n${err.stack}`);
		server.close();
	});

	server.on('message', (msg) => {
		data(msg.toString());
	});

	server.on('listening', () => {
		const address = server.address();
		console.log(`server listening ${address.address}:${address.port}`);
	});

	server.bind({
		address: address,
		port: port
	});
};

module.exports = datastream;
