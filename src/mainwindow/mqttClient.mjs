import mqtt from 'mqtt';

const client = mqtt.connect({host: 'localhost', port: 1883, protocol: 'mqtt'});

client.msgCount = 0;

client.on('connect', ()=> {
  client.subscribe('chat_test', (err) => {
    if (!err) {
      // client.publish('chat_test', 'Hello mqtt!');
      console.log('Subscribed!')
    }
    else {
      console.error(err);
    }
  })
});

client.on('message', (topic, message) => {
  const str_msg = message.toString();
  try {
    const msg = JSON.parse(str_msg);
    console.log(msg.payload);
    client.msgCount ++;
  }
  catch (e) {
    // console.log('error: ', e.valueOf());
    console.error('Bad JSON')
  }
});
