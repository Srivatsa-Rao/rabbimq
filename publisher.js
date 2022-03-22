const amqp = require("amqplib");

async function connect() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		const result = await channel.assertQueue("jobs");
		channel.sendToQueue(
			"jobs",
			Buffer.from(JSON.stringify({ number: process.argv[2] }))
		);
		console.log("Message sent", result);
	} catch (error) {}
}
connect();
process.exit;
