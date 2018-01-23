const Sequelize = require('sequelize')
const sequelize = new Sequelize('network', 'postgres', process.env.password, {
	host: 'localhost',
	dialect: 'postgres', 
	logging: false
})
let db = {}
db.users = require('./users.js')(sequelize, Sequelize.DataTypes)
db.activities = require('./activities.js')(sequelize, Sequelize.DataTypes)
db.sequelize = sequelize

db.users.findAll()
db.activities.findAll()


module.exports = db