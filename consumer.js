/*
    * for consumer, deleted soon 
*/

const amqp = require('amqplib/callback_api');
const fs = require('fs');

const ca = [fs.readFileSync('/etc/rabbitmq/ssl/ca_cert.pem')];

amqp.connect({
    protocol: 'amqps',
    hostname: 'labnav.my.id',
    port: 5671,
    ca: ca,
    cert: fs.readFileSync('/etc/rabbitmq/ssl/client_cert.pem'),
    key: fs.readFileSync('/etc/rabbitmq/ssl/client_key.pem')
}, function (error0, connection) {
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

    connection.createChannel(async function (error1, channel) {
        if (error1) {
            console.error('Channel error:', error1);
            return;
        }

        const exchangeName = 'ais';
        const queueName = 'rawQueue';

        await channel.assertExchange(exchangeName, 'direct');
        const q = await channel.assertQueue(queueName, {
            durable: true
        });
        await channel.bindQueue(q.queue, exchangeName, 'sby');

        channel.consume(q.queue, (msg) => {
            const data = JSON.parse(msg.content);
            callback(data.message);
            channel.ack(msg);
        });

        const queue = 'data_queue';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
