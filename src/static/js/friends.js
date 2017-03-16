document.addEventListener('ws-onOpen', function(e) {
	ws.send('{"type":"listUsers"}');
	ws.send('{"type":"listFriends"}');
})

document.addEventListener('wsMsg-usersList', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.list.forEach(function(usr) {
		var item = '<span><table style="display: inline"><tr><td><img class="allPeopleContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>'+usr+'</td></tr><tr><td><a href="#">Add User</a></td></tr></table></span>';
		$('#allPeopleTable').append(item);
	});
});

document.addEventListener('wsMsg-listOwnFriend', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.fList.forEach(function(frd){
		var item = '<span><table style="display: inline"><tr><td><img class="myPeopleContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>'+frd+'</td></tr><tr><td><a href="#">Start Chat</a></td></tr></table></span>';
		$('#myPeopleTable').append(item);
	})
});

$('#add_friend').click(function (e) {
	var afriend = $("#addFriend").val();
	aObj ={'type':'addFriend' , 'aFriend':afriend}
	ws.send(JSON.stringify(aObj))
	$("#jGRoom").val('')
})

$('#remove_friend').click(function (e) {
	var rfriend = $("#removeFriend").val();
	rObj ={'type':'removeFriend' , 'rFriend':rfriend}
	ws.send(JSON.stringify(rObj))
	$("#jGRoom").val('')
})


$('#send').click(function(e){
	var msg = $("#message").val()
	obj = {'type':'sendMsg','data':msg}
	ws.send(JSON.stringify(obj))
	$("#message").val('')
})
