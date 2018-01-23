
module.exports = (sequelize, dataTypes) => {
	return sequelize.define('activities', {
		location: dataTypes.STRING,
		activity: dataTypes.STRING,
		date: dataTypes.DATEONLY,
		time: dataTypes.TIME
	})
}