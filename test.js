const amqp = require('amqplib/callback_api');

const rabbitmqServer = 'amqp://ayamyeagah:1012@labnav.my.id:5672';

amqp.connect(rabbitmqServer, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    console.log("SUCCESSSSSS");
});