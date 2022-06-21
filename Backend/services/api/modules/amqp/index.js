const StatusCodeException = require("shared").exceptions.StatusCodeException;
const amqp = require("amqplib");
const { debug, log } = require("shared").utils.logging;
const { CHANNELS } = require("shared").config.amqp;
const { config } = require("../../middleware");

let connection = null,
  channel = null;

const connectToAMQP = async () => {
  try {
    if (connection === null) {
      connection = await amqp.connect(config.RABBITMQ_URI);
    }
    if (channel === null) {
      channel = await connection.createChannel();
      await channel.assertQueue(CHANNELS.TRIGGER_EVENT, {
        durable: true,
      });
    }
    return channel
  } catch (ex) {
    console.error(ex);
    throw ex;
  }
};

exports.publisher = async (rawMessage) => {
  const msg = JSON.stringify(rawMessage);

  const ch = await connectToAMQP();

  await ch.sendToQueue(CHANNELS.TRIGGER_EVENT, Buffer.from(msg));

  debug(`Sent message to '${CHANNELS.TRIGGER_EVENT}' queue. Body: ${msg}`);
};
