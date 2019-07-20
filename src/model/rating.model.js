
module.exports = (sequelize, Sequelize) => sequelize.define('rating', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	reviewStars: {
		type: Sequelize.INTEGER,
	},

})
