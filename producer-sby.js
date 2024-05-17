const config = require('./config');
const amqp = require('amqplib/callback_api');

const uri = config.amqp.uri;

async function pub(message) {
    amqp.connect(uri, function (error0, connection) {
        if (error0) {
            console.error('Connection error:', error0);
            return;
        }

        console.log('Connected to RabbitMQ Server');

        connection.createChannel(async function (error1, channel) {
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

        setTimeout(function () {
            connection.close();
            process.exit(0);
        }, 500);
    });
};

module.exports = pub;