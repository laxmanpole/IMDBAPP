const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
// eslint-disable-next-line no-unused-vars
const sequelize = require('../IMDBAPP/src/managers/sequelize.manager')
const logger = require('../IMDBAPP/logger/logger')
const SwaggerDocument = require('../IMDBAPP/src/swagger/swagger.json')
const config = require('../IMDBAPP/src/config/config')
const apiRoutes = require('../IMDBAPP/src/routes/route')

const app = express()
app.use(bodyParser.json())

// eslint-disable-next-line no-unused-expressions
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(SwaggerDocument))
app.use('/', apiRoutes)
app.listen(config.APP_PORT, config.APP_HOST, (err) => {
	if (err) {
		logger.error({
			error: err,
		})
		// eslint-disable-next-line no-console
		console.error(err)
	}
	// eslint-disable-next-line no-console
	console.info(`Server running on http://${config.APP_HOST}:${config.APP_PORT}`)
})
// eslint-disable-next-line max-len
// when the server is shutting down, it emits a SIGTERM event. this lets us clean up connections etc.
process.on('SIGTERM', () => {
	// eslint-disable-next-line no-console
	console.log('Server shutting down!!')
	process.exit(0)
})

module.exports = app
