const amqp = require("amqplib/callback_api");
const { CHANNELS } = require("shared").config.amqp;
const { debug, log } = require("shared").utils.logging;

const { config, executeChain } = require("./modules");
log('Starting evaluator service');

amqp.connect('amqp://guest:guest@RabbitMQ:5672/', function (err, connection) {
  if (err) {
    throw err;
  }
  log('Connection created successfully')
  connection.createChannel(function (err1, channel) {
    if (err1) {
      throw err1;
    }

    channel.assertQueue(CHANNELS.TRIGGER_EVENT, {
      durable: true,
    });

    log(`[*] Waiting for messages in '${CHANNELS.TRIGGER_EVENT}'. To exit press CTRL+C`);
    channel.consume(
      CHANNELS.TRIGGER_EVENT,
      function (msg) {
        const data = JSON.parse(msg.content.toString());
        executeChain(data);
      },
      {
        noAck: true,
      }
    );
  });

  process.on("SIGINT", function () {
    console.log()
    log('[!] Caught SIGINT. Shutdown procedure done');
    connection.close();
    log('[-] UnInit finished successfully.')
  });
});
