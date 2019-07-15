module.exports = (sequelize, Sequelize) => sequelize.define('producers', {
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
	sex: {
		type: Sequelize.STRING(255),
		allowNull: false,
	},
	dob: {
		type: Sequelize.DATE(),
		allowNull: false,
	},
	bio: {
		type: Sequelize.STRING(255),
		allowNull: true,
	},
})
