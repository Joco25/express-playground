const express =require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000
var app = express()

// Middlewares
hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
})
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase()
})

app.set('view engine','hbs')

app.use((req,res,next)=>{
	var now = new Date().toString()
	var log=`${now}: ${req.method} ${req.url}`
	console.log(log)
	fs.appendFile('server.log',log+	'\n',(err)=>{
		if(err){
			console.log('Unable to append to server.log.')
		}
	})
	next()
})

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
		title:'About',
		pageTitle: 'About Page',
	})
})

app.get('/',(req,res)=>{
	res.render('home.hbs',{
		title:'Home',
		pageTitle: 'Home Page',
		welcomeMsg: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium perspiciatis nobis, in enim sit alias maiores veniam iusto a quibusdam ex eos cum labore culpa architecto pariatur. Incidunt sunt, odio.'
	})
})

app.use(express.static(__dirname + '/public'));

app.get('/bad',(req,res)=>{
	res.send({
		error: 'ohhh boy, now you did it'
	})
})

// app.use((req,res,next)=>{
// 	res.render('maintenance.hbs',{
// 		title:'Maintenance',
// 		pageTitle: 'Maintenance in Progress',
// 		welcomeMsg: 'Please we would be back soon'
// 	})
// })

app.listen(port,()=>{
	console.log(`Server started, running on port ${port}`)
})