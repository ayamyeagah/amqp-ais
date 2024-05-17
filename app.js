const config = require('./config');
const datastream = require('./datastream');
const pub = require('./producer-sby')

// UDP Listening Address and port
const ADDRESS = config.udp.address;
const PORT = config.udp.port;

datastream(PORT, ADDRESS, data => {
	// console.log(data);
	pub(data);
});