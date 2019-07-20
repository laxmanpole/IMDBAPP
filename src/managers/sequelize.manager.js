const Sequelize = require('sequelize')
const Actor = require('../model/actor.model')
const Comment = require('../model/comment.model')
const Reply = require('../model/reply.model')
const Reviewer = require('../model/reviewer.model')
const Rating = require('../model/rating.model')
const Movie = require('../model/movie.model')
const producer = require('../model/producer.model')
const ActorMovie = require('../model/actorMovie.model')
const ProducerMovie = require('../model/producermovie.model')
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

const ActorModel = Actor(sequelize, Sequelize)
const MovieModel = Movie(sequelize, Sequelize)
const ProducerModel = producer(sequelize, Sequelize)
const ActorMovieModel = ActorMovie(sequelize, Sequelize)
const ProducerMovies = ProducerMovie(sequelize, Sequelize)
const CommentModel = Comment(sequelize, Sequelize)
const ReplyModel = Reply(sequelize, Sequelize)
const ReviewerModel = Reviewer(sequelize, Sequelize)
const RatingModel = Rating(sequelize, Sequelize)

MovieModel.belongsToMany(ActorModel, { through: ActorMovieModel })
MovieModel.belongsToMany(ProducerModel, { through: ProducerMovies })
ReviewerModel.hasMany(CommentModel)
ReviewerModel.hasMany(ReplyModel)
MovieModel.hasMany(CommentModel)
CommentModel.hasMany(ReplyModel)
MovieModel.hasMany(RatingModel)
ReviewerModel.hasMany(RatingModel)

sequelize.sync()
	.then(() => {
		console.info('Database connected successfully!')
	})

module.exports = {
	sequelize,
	ActorModel,
	MovieModel,
	ProducerModel,
	ActorMovieModel,
	CommentModel,
	ReplyModel,
	ReviewerModel,
	RatingModel,
}
