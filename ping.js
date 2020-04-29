const fs = require('fs');
const fetch = require('node-fetch');
function ping(){
	return fs.readFileSync('./urls.txt', 'utf-8')
}
function pong(txt){
	fs.writeFileSync('./urls.txt', `${txt.trim()}`)
}
function cycle(){
	let data = ping();
	data = data.split(',').map(piece => piece.trim()).filter(piece => piece.length > 2 && piece.includes('http'))
	for(let piece of data){
		fetch(piece)
	}
}
module.exports = {
	ping,
	pong,
	cycle
}
