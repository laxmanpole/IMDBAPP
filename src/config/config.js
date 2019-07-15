const dotenv = require('dotenv')

dotenv.config()

const config = {
	ENVIRONMENT: process.env.ENVIRONMENT || 'DEVELOPMENT',
	APP_HOST: process.env.APP_HOST || '0.0.0.0',
	APP_PORT: process.env.APP_PORT || '4000',
	SWAGGER_PORT: process.env.SWAGGER_PORT || '3000',
	MYSQL_HOST: process.env.MYSQL_HOST || '0.0.0.0',
	MYSQL_USERNAME: process.env.MYSQL_USERNAME || 'root',
	MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'root',
	MYSQL_DB_NAME: process.env.MYSQL_DB_NAME || 'database',

}

module.exports = config
