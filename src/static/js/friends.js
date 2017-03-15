// $(function(){
// 	var ws = new WebSocket("ws://localhost:8888/ws");
//
// 	ws.onopen = function(){
// 	ws.send(JSON.stringify({
// 		type: 'authenticate',
// 		token: getToken()
// 	}));
//
// 	groups ={'type':'listUsers'}
// 	ws.send(JSON.stringify(groups))
// 	group ={'type':'listFriends'}
// 	ws.send(JSON.stringify(group))
// 	}
//
// 	ws.onmessage = function(e){
// 		temp = JSON.parse(e.data)
// 		if(temp['type'] == 'usersList'){
// 			//TODO add click event to image --> chatHistory Handler
// 			temp['list'].forEach(function(usr){
// 				img = '<img class="allPeopleContent" src="userIcon.png" width="50px" height="50px" />'
// 				$('.allPeopleContainer').append(img)
// 				console.log(usr)
// 			})
// 		}
//
// 		else if(temp['type'] == 'listOwnFriend'){
// 			//TODO add click event to image --> chatHistory Handler
// 			temp['fList'].forEach(function(frd){
// 				img = '<img class="myPeopleContent" src="userIcon.png" width="50px" height="50px" />'
// 				$('.myPeopleContainer').append(img)
//
// 			})
// 		}
//
// 		else if(temp['type'] == 'authResponse'){
// 			$('#username').text(temp['user']);
// 		}
// 	}
// })

document.addEventListener('ws-onOpen', function(e) {
	ws.send('{"type":"listUsers"}');
	ws.send('{"type":"listFriends"}');
})

document.addEventListener('wsMsg-usersList', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.list.forEach(function(usr) {
		img = '<img class="allPeopleContent" src="userIcon.png" width="50px" height="50px" />'
		$('.allPeopleContainer').append(img)
		console.log(usr)
	});
});

document.addEventListener('wsMsg-listOwnFriend', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.fList.forEach(function(frd){
		img = '<img class="myPeopleContent" src="userIcon.png" width="50px" height="50px" />'
		$('.myPeopleContainer').append(img)
		console.log(frd)
	})
});

$('#add_friend').click(function (e) {
	var afriend = $("#addFriend").val();
	aObj ={'type':'addFriend' , 'aFriend':afriend}
	webSocket.send(JSON.stringify(aObj))
	$("#jGRoom").val('')
})

$('#remove_friend').click(function (e) {
	var rfriend = $("#removeFriend").val();
	rObj ={'type':'removeFriend' , 'rFriend':rfriend}
	webSocket.send(JSON.stringify(rObj))
	$("#jGRoom").val('')
})


$('#send').click(function(e){
	var msg = $("#message").val()
	obj = {'type':'sendMsg','data':msg}
	webSocket.send(JSON.stringify(obj))
	$("#message").val('')
})
