const { kafka } = require('./client');

async function init(){
    const admin = kafka.admin();
    console.log('Admin Connecting ...');
    admin.connect();
    console.log('Admin Connection Success');

    console.log('Topic Create [rider-updates]');
    await admin.createTopics({
            topics: [
                {
                    topic: 'rider-updates',
                    numPartitions: 2, 
                }
            ]
        });
    console.log('Topic Create success [rider-updates]')

    console.log('disconnecting admin ...');
    await admin.disconnect();

}

init();