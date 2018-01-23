require('dotenv').load()
const request = require('request')

module.exports= (db, app)=>{
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
			console.log("RESPONSE: ", body)
			const options2 = {
				method: "GET",
				uri: 'https://api.linkedin.com/v1/people/~?format=json',
				headers: {
					'Authorization': 'Bearer ' + body.access_token
				}
			}
			request(options2, (error, response, body) =>{
				if (error) throw error
				var user = JSON.parse(body),
					linkId = user.id,
					firstName = user.firstName,
					lastName = user.lastName,
					headline = user.headline
					console.log(user)
					console.log(firstName)
					console.log(linkId)
					console.log("user: ", {user:user})
				req.session.user = {/*session is set*/
					linkId: linkId,
					name: firstName
				}
				console.log("session.id: ", req.session.user)
				var statusCode = 200
				if (statusCode >= 100 && statusCode < 600){
  					res.status(statusCode);
				}
				else{
  					res.status(500);
				}
				res.redirect('/profile')
				// , {
				// 	user: req.session.user,
				// 	user: user
				// }
			})
		}) 
	})
}