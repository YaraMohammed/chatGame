$(function(){
	var ws = new WebSocket("ws://localhost:8888/ws");

	ws.onopen = function(){
	ws.send(JSON.stringify({
		type: 'authenticate',
		token: getToken()
	}));

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

		else if(temp['type'] == 'listOwnFriend'){
			//TODO add click event to image --> chatHistory Handler
			temp['fList'].forEach(function(frd){
				img = '<img class="myPeopleContent" src="userIcon.png" width="50px" height="50px" />'
				$('.myPeopleContainer').append(img)
				
			})
		}

		else if(temp['type'] == 'authResponse'){
			$('#username').text(temp['user']);
		}
	}
})