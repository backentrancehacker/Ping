document.querySelector('input').addEventListener('keyup', (e) => {
    if (event.key === "Enter") {
		let xhr = new XMLHttpRequest();
		xhr.open('POST', '/pong');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.onload = () => {
			if(xhr.status === 200){
				let response = JSON.parse(xhr.responseText);
				if(response.hasOwnProperty('error')){
					createNotification(`<i class="fas fa-exclamation-triangle"></i> ${response.error}`, 'bad')
				}
				else{
					createNotification(`<i class="fas fa-check-circle"></i> ${response.success}`, 'good')

				}
			}
		}
		xhr.send(JSON.stringify({
			value: e.target.value
		}))

        return false;
    }
})
function createNotification(txt, type){
	document.getElementById('notifications').innerHTML = `<div class='${type}'>${txt}</div>`;
}