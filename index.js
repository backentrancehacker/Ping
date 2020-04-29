const Server = require('./server').App,
	util = require('util'),
	{ping, pong} = require('./ping'),
	{getFiles} = require('./files');

let app = new Server;
const files = getFiles('./public');
app.folder = './public'
app.get(files.map((part) => part.replace(app.folder, '')), (req, res) => {
	app.sendFile(req.url)
})
app.get('/', (req, res) => {
	app.sendFile('/index.html')
})
app.post('/pong',  (req, res) => {
	app.collect((json)=> {
		let {value} = JSON.parse(json);
		if(!value) return;
		let url;

		try{
			url = new URL(value).hostname
		}
		catch(e){
			app.send(JSON.stringify({
				error: 'Invalid Url'
			}))
			return;
		}
		let data =  ping();

		if(data.split(', ').includes(url)){
			app.send(JSON.stringify({
				error: 'Url has already been added'
			}))
			return;
		}

		data += `, ${url.trim()}`
		pong(data)

		app.send(JSON.stringify({
			success: 'Added to que'
		}))
	})
})
app.start(8080)