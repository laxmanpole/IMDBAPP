module.exports = (sequelize, Sequelize) => sequelize.define('commentLike', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	likes: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
})
