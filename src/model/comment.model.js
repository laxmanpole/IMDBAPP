module.exports = (sequelize, Sequelize) => sequelize.define('comments', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	text: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
})
