module.exports = (sequelize, Sequelize) => sequelize.define('users', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	firstname: {
		type: Sequelize.STRING(255),
		allowNull: true,
		unique: true,
	},
	lastname: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	bio: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
})
