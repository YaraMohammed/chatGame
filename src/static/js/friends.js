$(function(){
	var ws = new WebSocket("ws://localhost:8888/ws");

	ws.onopen = function(){
	groups ={'type':'listUsers'}
	ws.send(JSON.stringify(groups))
	}

	ws.onmessage = function(e){
		temp = JSON.parse(e.data)
		if(temp['type'] == 'usersList'){
			//TODO add click event to image --> chatHistory Handler
			temp['list'].forEach(function(usr){
				img = '<img class="allPeopleContent" src="userIcon.png" width="50px" height="50px" />'
				$('.allPeopleContainer').append(img)
				console.log(usr)
			})
		}
	}
})