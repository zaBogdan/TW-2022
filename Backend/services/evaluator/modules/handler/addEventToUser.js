exports.execute = async (message) => {
    const date = new Date().getTime();

    if(message.listener.events[message.event] !== undefined) {
        message.listener.events[message.event].data.push(date);
        message.listener.events[message.event].latest = date;
    } else {
        message.listener.events[message.event] = {
            data: [date],
            latest: date
        }
    }
    return message;
}