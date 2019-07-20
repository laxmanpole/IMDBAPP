const { ReviewerModel } = require('../managers/sequelize.manager')

const addUser = async ({
	name,
}) => {
	try {
		return await ReviewerModel.create({
			name,
		})
	} catch (err) {
		return err
	}
}

const userService = {
	addUser,
}

module.exports = userService
