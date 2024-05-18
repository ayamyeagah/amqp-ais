const config = require('./config');
const datastream = require('./datastream');
const Producer = require('./producer')
const producer = new Producer();

// UDP Listening Address and port
const ADDRESS = config.udp.address;
const PORT = config.udp.port;

datastream(PORT, ADDRESS, data => {
	producer.pub(data);
});