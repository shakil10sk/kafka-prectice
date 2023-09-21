const { kafka } = require('./client');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function init(){
    const producer = kafka.producer();

    console.log('connecting producer');
    producer.connect();
    console.log('producer connting success');

    rl.setPrompt('> ')
    rl.prompt();
    rl.on('line', async function(line) {
        const [riderName, location] = line.split(' ');

        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: location.toLowerCase === 'dhaka' ? 0 : 1,
                    key: 'location-update',
                    value: JSON.stringify({riderName, location})}, 
            ]
        })

    }).on('close', async () => {
        await producer.disconnect();
    })
}

init();