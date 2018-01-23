require('dotenv').load()
const session = require('express-session')

module.exports=(db, app)=> {
	app.get("/createActivity", (req, res) => {
	    /*if(!req.session.user) res.redirect("/user/login")*/
	    // else {
	        res.render('createActivity', {
	            user: req.session.user
	        })
	})

	app.post("/createActivity", (req, res)=> {
		/*this is the insert into in sequelize, connected to the front end form*/
		console.log("activity to be create")
		db.activities.create({ /*create activity in table activities*/
			location: req.body.location,
			activity: req.body.activity,
			date: req.body.date,
			time: req.body.time
		})
	})
}
