const config = require('./config');
const amqp = require('amqplib');

const uri = config.amqp.uri;
const routingKey = config.amqp.routing;
const exchange = config.amqp.exchange;

class Producer {
    channel;

    async createChannel() {
        try {
            const conn = await amqp.connect(uri);
            this.channel = await conn.createChannel();
        } catch (err0) {
            console.error('Error connection & creating channel:', err0);
        }
    }

    async pub(message) {
        try {
            if (!this.channel) {
                await this.createChannel();
            }

            await this.channel.assertExchange(exchange, 'direct', {
                durable: true
            });

            const msg = {
                type: routingKey,
                message: message
            };

            await this.channel.publish(
                exchange,
                routingKey,
                Buffer.from(JSON.stringify(msg)),
                {
                    persistent: true
                }
            );

            console.log(`${message}`);
        } catch (err1) {
            console.error('Error publishing message:', err1);
        }
    }
}

module.exports = Producer;