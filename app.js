const express = require('express')
const app = express() 
const pg = require('pg')
const session = require('express-session')
require('dotenv').load()
const Client = pg.Client
const rp = require('request-promise')
	
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

app.get('/redirectUrl', (req, res)=> {
	var code = req.query.code
	const options = {
		method: 'POST',
		uri: 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=AQRSbDtv05_qx66vCEA3vEJ8u6FDHj4D-qxbiQWqTTiTAzwxy0r-aRYto1pN54lZTDZKqKdKq0lIDtTgFOCQtcizJYsUv0KR27yXoE6Gy7pCmRu2pHPzTS8KC2xImENnCuqVjwdPcGunEgu_ZI8OHGgG1xK_Jg&client_id=78xhz4xgziog5d&redirect_uri=http://localhost:3000/redirectUrl&client_secret=v2a6T8JMnKLKXH5D',
		json: true,
	};
	rp(options)
	.then(function (response){
		response.render('index')
	})
	.catch(function (err) {
		console.log("ERROR 50: ", err)	
	})
})


app.post('/redirectUrl', (req,res)=> {
	var code = req.body.code,
		state = req.body.code
	console.log("code: ", code)
	console.log("state: ", state)
	res.redirect('/index')
})

app.listen(process.env.webport, function(){
	console.log("Thug Life on port", process.env.webport)
})