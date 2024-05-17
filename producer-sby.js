const config = require('./config');
const amqp = require('amqplib/callback_api');
const fs = require('fs');

async function pub(message) {
	amqp.connect({
	  protocol: 'amqps',
	  hostname: config.amqp.host,
	  port: config.amqp.port,
	  ca: [fs.readFileSync(config.amqp.SSL.ca)],
	  cert: fs.readFileSync(config.amqp.SSL.cert),
	  key: fs.readFileSync(config.amqp.SSL.key)
	}, function(error0, connection) {
	  if (error0) {
		console.error('Connection error:', error0);
		return;
	  }

	  console.log('Connected successfully to RabbitMQ with SSL/TLS');

	  connection.on('blocked', (reason) => {
		console.log(`Connection blocked: ${reason}`);
	  });

	  connection.on('unblocked', () => {
		console.log('Connection unblocked');
	  });

	  connection.createChannel(function(error1, channel) {
		if (error1) {
		  console.error('Channel error:', error1);
		  return;
		}
		
		const routingKey = config.amqp.routingKey;
		const exchangeName = config.amqp.exchange;
		await channel.assertExchange(exchangeName, 'direct');
		
		const msg = {
            type: routingKey,
            message: message
        };
		
		await channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(JSON.stringify(msg))
        );
		
		console.log(`${message} sent to ${exchangeName}`);
	  });

	  setTimeout(function() {
		connection.close();
		process.exit(0);
	  }, 500);
	});
};

module.exports = pub;