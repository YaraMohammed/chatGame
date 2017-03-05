
$(function(){
	ws = new WebSocket("ws://localhost:8888/ws");

	ws.onopen = function(){
		ws.send('{"type":"authenticate","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lZGhhdCJ9.YTIPJC5HqvBNT3OaDVX84r8TXv5AsrJBvRkaxDGltgk"}')
	groups ={'type':'listGroups'}
	ws.send(JSON.stringify(groups))
	group ={'type':'listGroup'}
	ws.send(JSON.stringify(group))
	}

	ws.onmessage = function(e){
		temp = JSON.parse(e.data)
		if(temp['type'] == 'groupList'){
			//TODO add click event to image --> chatHistory Handler
			temp['list'].forEach(function(grp){
				img = '<img class="allGroupsContent" src="userIcon.png" width="50px" height="50px" />'
				$('#allGroupsContainer').append(img)
			})
		}

	
		else if(temp['type'] == 'listOwnGroup'){
			//TODO add click event to image --> chatHistory Handler
			temp['gList'].forEach(function(grop){
				img = '<img class="myGroupsContent" src="userIcon.png" width="50px" height="50px" />'
				$('#myGroupsContainer').append(img)
				// console.log(img)
			})
		}
		else
			console.log(temp)
	}
})