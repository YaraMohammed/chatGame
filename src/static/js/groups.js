
$(function(){
	var ws = new WebSocket("ws://localhost:8888/ws");

	ws.onopen = function(){
	groups ={'type':'listGroups'}
	ws.send(JSON.stringify(groups))
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
	}
})