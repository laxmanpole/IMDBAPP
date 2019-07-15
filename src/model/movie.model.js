module.exports = (sequelize, Sequelize) => sequelize.define('movies', {
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
	releaseYear: {
		type: Sequelize.DATE(),
		allowNull: false,
	},
	plot: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	view: {
		type: Sequelize.INTEGER,
	},
	poster: {
		type: Sequelize.BLOB(),
		allowNull: true,
	},
})
