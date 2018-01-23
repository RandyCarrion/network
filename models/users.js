/*-----create model for users table in db----*/
module.exports = (sequelize, dataTypes) => {
	return sequelize.define('users', { /*define the table structure*/
		linkedin_id: dataTypes.STRING,
		firstName: dataTypes.STRING,
		lastName: dataTypes.STRING,
		headline: dataTypes.STRING
	})
}