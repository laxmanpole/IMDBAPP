module.exports = (sequelize, Sequelize) => sequelize.define('reviewer', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	name: {
		type: Sequelize.STRING(255),
		allowNull: true,
		unique: true,
	},

})
