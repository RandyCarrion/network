const express = require('express')
require('dotenv').load()
const app = express() 
const pg = require('pg')
const fs = require('fs')
const bodyParser = require("body-parser")
const session = require('express-session')
const uncaught = require('uncaught')
const Client = pg.Client
const request = require('request')
const db = require("./models/db.js")

db.sequelize.authenticate() /*tests connection*/
.then(()=> {
}).then(()=> {

	db.sequelize.sync({force: false})/* syncs all the tables if not yet created in db, and */


})

//const User = sequelize.import(__dirname + '../models/users.js')
//const Activity = sequelize.import(__dirname + '../models/activities.js')
//const Restaurant = sequelize.import(__dirname + "../models/restaurant.js")


app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))
app.use('/', bodyParser.urlencoded({ extended: true }));
app.use('/user', express.static('public'))
app.use('/event', express.static('public'))


app.use(session({
    secret: 'secret-session',
    resave: true,
    saveUninitialized: true
}));

app.get('/', (req, res, err) => {
	res.render('index')
})

require('./routes/usersRoutes.js')(db, app) /*route connecting to the users module*/
require('./routes/events.js')(db, app)/*route connecting to the events module*/


/*-----access_token and linkedin json data----*/
require('./routes/login.js')(db,app)
// require('./routes/events.js')(app)

/*--------Searchbar---------*/
app.post("/", (request, response) => {
    fs.readFile('cities.json', function(err, data) {
        if (err) throw err;
        
        var cityList = JSON.parse(data)
        var allContent = request.body.searchData
        var usersSug = []
        for (var i = 0; i < cityList.length; i++) {
            if (allContent.toLowerCase() === cityList[i].name.slice(0, allContent.length).toLowerCase() || allContent.toLowerCase() === cityList[i].country.slice(0, allContent.length).toLowerCase()) {
                usersSug.push(cityList[i].name + ", " + cityList[i].country)
            }
        }
        response.json({ status: 200, search: usersSug})
    });
})

app.listen(process.env.webport, function(){
	console.log("Thug Life on port", process.env.webport)
})

