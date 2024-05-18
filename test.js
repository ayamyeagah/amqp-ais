/**
 * Use for test rabbitMQ connection
 */

const config = require('./config');
const amqp = require('amqplib/callback_api');

const uri = config.amqp.uri;

amqp.connect(uri, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    console.log("Success!");
});