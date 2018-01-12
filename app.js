const express = require('express')
const app = express() 
const pg = require('pg')
const session = require('express-session')
require('dotenv').load()
const Client = pg.Client
const request = require('request')
	
const client = new Client({
		user:process.env.user,
		host:'localhost',
		database: 'Network', 
		port:'54320',
		password: process.env.password
})
client.connect()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public')); 

app.get('/', (req, res, err) => {
	res.render('index')
})

/*-----access_token and linkedin json data----*/
app.get('/redirectUrl', (req, res)=> {
	var code = req.query.code
	var state = req.query.state
	var id = process.env.Linkedin
	var secret = process.env.clientSecret
	console.log(code)
	const options = {
		method: 'POST',
		uri: `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&client_id=${id}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FredirectUrl&client_secret=${secret}`,
		json: true,
		headers: {
 			'Content-type': 'application/x-www-form-urlencoded'
 		}
	};
	request(options, function (error, response, body){
		if(error) throw error
		debugger
		console.log("RESPONSE: ", body)
		const options2 = {
			method: "GET",
			uri: 'https://api.linkedin.com/v1/people/~?format=json',
			headers: {
				'Authorization': 'Bearer ' + body.access_token
			}
		}
		request(options2, function(error, response, body) {
			debugger
			if (error) throw error
			console.log("ERROR: ", error)
			console.log('body: ', body)
		})
	})
})

app.listen(process.env.webport, function(){
	console.log("Thug Life on port", process.env.webport)
})