const mongoose = require ('mongoose')

const{dbUsername,dbPassword,dbHost,dbName}=require('./index')

const connection = async () => {
	const conn = await mongoose.connect(
		`mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority&appName=Cluster0`
	);

	console.log(`Mongo DB connected:${conn.connection.host}`);
};

module.exports={connection,mongoose}