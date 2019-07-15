module.exports = (sequelize, Sequelize) => sequelize.define('actorMovie', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	actor_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,

	},
	movie_id: {
		type: Sequelize.INTEGER,
		primaryKey: true,

	},

})
