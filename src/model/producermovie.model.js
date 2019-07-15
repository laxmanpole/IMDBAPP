module.exports = (sequelize, Sequelize) => sequelize.define('producerMovie', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	producer_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,

	},
	movie_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,

	},

})
