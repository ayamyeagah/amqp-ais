/**
 * For consume message from broker
 * 
 * 1. Connect to rabbitmq server
 * 2. Create a new channel
 * 3. Create the exchange
 * 4. Create the queue
 * 5. Bind the queue to the exchange
 * 6. Consume message from the queue
 */

const config = require('./config');
const amqp = require('amqplib');

const uri = config.amqp.uri;
const routingKey = config.amqp.routing;
const exchange = config.amqp.exchange;
const queueName = config.amqp.queue;

class Consumer {
    channel;

    async createChannel() {
        try {
            const conn = await amqp.connect(uri);
            this.channel = await conn.createChannel();
        } catch (err0) {
            console.error('Error connection & creating channel:', err0);
        }
    }

    async sub(callback) {
        try {
            if (!this.channel) {
                await this.createChannel();
            }

            await this.channel.assertExchange(exchange, 'direct', {
                durable: true
            });

            const q = await this.channel.assertQueue(queueName, {
                durable: true
            });

            await this.channel.bindQueue(q.queue, exchange, routingKey);

            this.channel.consume(q.queue, (msg) => {
                const data = JSON.parse(msg.content);
                callback(data.message);
                this.channel.ack(msg);
            });
        } catch (err1) {
            console.error('Error consuming message:', err1);
        }
    }
}

module.exports = Consumer;
