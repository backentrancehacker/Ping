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
	data = data.split(',')
	.map(piece => {
		let subPiece = piece.trim();
		return subPiece.includes('http') ? subPiece : `https://${subPiece}`;
		
	})
	.filter(piece => piece.length > 5)

	for(let piece of data){
		fetch(piece, {method: 'GET'})
		.catch(() => {
			console.log('Invalid Link', piece)
		})
	}

}
module.exports = {
	ping,
	pong,
	cycle
}
