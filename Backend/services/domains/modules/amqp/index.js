const StatusCodeException = require("shared").exceptions.StatusCodeException;
const amqp = require("amqplib/callback_api");
const { debug } = require("shared").utils.logging;
const { CHANNELS } = require("shared").config.amqp;
const { config } = require("../../middleware");

exports.publisher = async (rawMessage) => {
  await new Promise((resolve, reject) => {
    amqp.connect(config.RABBITMQ_URI, (err, conn) => {
      if (err) {
        throw new StatusCodeException("Error connecting to RabbitMQ", 500);
      }
      conn.createChannel((err, ch) => {
        if (err) {
          throw new StatusCodeException("Error creating channel", 500);
        }

        const msg = JSON.stringify(rawMessage);

        ch.assertQueue(CHANNELS.TRIGGER_EVENT, {
          durable: true,
        });

        ch.sendToQueue(CHANNELS.TRIGGER_EVENT, Buffer.from(msg));

        debug(
          `Sent message to '${CHANNELS.TRIGGER_EVENT}' queue. Body: ${msg}`
        );
        ch.close();
        resolve()
      });
    });
  });
};
