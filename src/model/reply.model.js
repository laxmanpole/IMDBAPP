module.exports = (sequelize, Sequelize) => sequelize.define('reply', {
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
