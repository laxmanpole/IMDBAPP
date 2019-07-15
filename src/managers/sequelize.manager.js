/* eslint-disable max-len */
const Sequelize = require('sequelize')
const actor = require('../model/actor.model')
const movie = require('../model/movie.model')
const producer = require('../model/producer.model')
const actorMovie = require('../model/actorMovie.model')
const producerMovie = require('../model/producermovie.model')
const config = require('../config/config')

const sequelize = new Sequelize(config.MYSQL_DB_NAME, config.MYSQL_USERNAME, config.MYSQL_PASSWORD, {
	host: config.MYSQL_HOST,
	dialect: 'mysql',
	logging: false,
	dialectOptions: {
		charset: 'utf8mb4',
	},
	define: {
		underscored: true,
		timestamps: true,
	},

})

const actorModel = actor(sequelize, Sequelize)
const movieModel = movie(sequelize, Sequelize)
const producerModel = producer(sequelize, Sequelize)
const actormovieModel = actorMovie(sequelize, Sequelize)
const producerMovies = producerMovie(sequelize, Sequelize)

actorModel.hasMany(movieModel)
movieModel.belongsToMany(actorModel, { through: actormovieModel })
producerModel.hasMany(movieModel)
movieModel.belongsToMany(producerModel, { through: producerMovies })

sequelize.sync()
	.then(() => {
		// eslint-disable-next-line no-console
		console.log('Database connected successfully!')
	})

module.exports = {
	sequelize,
	actorModel,
	movieModel,
	producerModel,
	actormovieModel,
}
