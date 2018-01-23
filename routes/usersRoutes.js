/*---insert user into table 'users' if not found */
const session = require('express-session')

module.exports = (db, app)=>{
	app.get('/profile', (req, res) =>{
		console.log("REQ: ", req.user)
		db.users.findOrCreate({where: {/*find or create user into the table*/
			linkedin_id: req.user.linkId
		}, 
		defaults: {/*res.body/user is because its a response*/
			firstName: req.user.firstName,
			lastName: req.user.lastName,
			headline: req.user.headline
		}
		})
		console.log("user in system")
	})
}
