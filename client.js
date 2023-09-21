const { Kafka } = require('kafkajs');

exports.kafka = new Kafka({
    clientId: 'my_app',
    brokers: ["172.22.112.1:9092"],
});
