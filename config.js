module.exports = {
	udp: {
		port: 2024,
		address: '127.0.0.1'
	},
	amqp: {
		host: 'labnav.my.id',
		port: 5671,
		SSL: {
			ca: '/path/to/ca_cert.pem',
			cert: '/path/to/ca_cert.pem',
			key: '/path/to/ca_cert.pem'
		}
		exchange: 'ais',
		routingKey: 'sby',
		infoQueue: 'rawQueue'
	}
}