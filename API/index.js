// --------------------------------------APP_CONFIG
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const { app } = require('./server.js');
const { mongoose } = require('./models/models.js');
const host_server = process.env.SERVER_HOST || '127.0.0.1';
const port_server = 3000;
const host_db = process.env.DB_HOST || 'localhost';
const port_db = 27017;
let autoSync = require('./controllers/autosync.js');

// --------------------------------------START SERVER+DB
(async () => {
	try {
		await mongoose.connect(`mongodb://${host_db}:${port_db}/github_trending`).then(() => {
			console.log('Mongoose connected!');
			app.listen(port_server, host_server, () => {
				if (process.env.SERVER_PORT_OUTER) {
					console.log(`Server running at http://${host_server}:${process.env.SERVER_PORT_OUTER}/`);
				} else {
					console.log(`Server running at http://${host_server}:${port_server}/`);
				}
				// auto sync start
				autoSync.startTimer();
			});
		});
	} catch (error) {
		console.log(`Error: ${error.message}`);
	}
})();

// --------------------------------------EXIT SERVER+DB
process.on('SIGINT', async () => {
	await mongoose.disconnect();
	console.log('\nMongoose disconnected!\nServer exit');
	process.exit(0);
});
