module.exports = {
	udp: {
		port: 2024,
		address: '127.0.0.1'
	},
	amqp: {
		host: 'labnav.my.id',
		uri: 'amqp://ayamyeagah:1012@labnav.my.id:5672',
		port: 5671,
		SSL: {
			ca: './ssl/ca_cert.pem',
			cert: './ssl/to/ca_cert.pem',
			key: './ssl/to/ca_cert.pem'
		},
		exchange: 'ais',
		routing: 'nmea',
		queue: 'station'
	}
}