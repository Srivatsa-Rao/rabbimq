const amqp = require("amqplib");

async function connect() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		const result = await channel.assertQueue("jobs");
		channel.consume("jobs", (message) => {
			console.log(message.content.toString());
			if (message.content.toString().includes(102)) {
				console.log("Message received", message.content.toString());
				// channel.ack(message);
			}
		});
		console.log("Waiting for messages in jobs queue...");
	} catch (error) {}
}
connect();
