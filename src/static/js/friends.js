$(function(){
	var ws = new WebSocket("ws://localhost:8888/ws");

	ws.onopen = function(){
		ws.send('{"type":"authenticate","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lZGhhdCJ9.YTIPJC5HqvBNT3OaDVX84r8TXv5AsrJBvRkaxDGltgk"}')

	groups ={'type':'listUsers'}
	ws.send(JSON.stringify(groups))
	group ={'type':'listFriends'}
	ws.send(JSON.stringify(group))
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

		if(temp['type'] == 'listOwnFriend'){
			//TODO add click event to image --> chatHistory Handler
			temp['fList'].forEach(function(frd){
				img = '<img class="myPeopleContent" src="userIcon.png" width="50px" height="50px" />'
				$('.myPeopleContainer').append(img)
				
			})
		}
	}
})