var reqs = [];
var frds = [];

document.addEventListener('ws-onOpen', function(e) {
	ws.send('{"type":"listFriends"}');
	ws.send('{"type":"listFriendReqs"}');
	ws.send('{"type":"listUsers"}');
})

document.addEventListener('wsMsg-usersList', function(e) {
	$('#allPeopleTable').html('');
	e.detail.list.forEach(function(usr) {
		if (usr != user && frds.indexOf(usr) == -1 && reqs.indexOf(usr) == -1) {
			var item = '<span><table style="display: inline"><tr><td><img class="allPeopleContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>'+usr+'</td></tr><tr><td><a id="'+usr+'" class="addFriend" href="#">Send Request</a></td></tr></table></span>';
			$('#allPeopleTable').append(item);
		}
	});
});

document.addEventListener('wsMsg-listOwnFriend', function(e) {
	$('#myPeopleTable').html('');
	frds = e.detail.fList;
	e.detail.fList.forEach(function(frd){
		var room = (user<frd)?(user+'-'+frd):(frd+'-'+user);
		var item = '<span><table style="display: inline"><tr><td><a href="/static/chatPage.html?group='+room+'"><img class="myPeopleContent" src="userIcon.png" width="50px" height="50px"></a></td></tr><tr><td>'+frd+'</td></tr><tr><td><a id="'+frd+'" class="removeFriend" href="#">Remove</a></td></tr></table></span>';
		$('#myPeopleTable').append(item);
	})
});

document.addEventListener('wsMsg-listFriendReqs', function(e) {
	$('#reqPeopleTable').html('');
	reqs = e.detail.fList;
	e.detail.fList.forEach(function(frd){
		var item = '<span><table style="display: inline"><tr><td><img class="reqPeopleContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>'+frd+'</td></tr><tr><td><a id="'+frd+'" class="acceptFriend" href="#">Accept</a> <a id="'+frd+'" class="denyFriend" href="#">Deny</a></td></tr></table></span>';
		$('#reqPeopleTable').append(item);
	})
});

// $('#add_friend').click(function (e) {
// 	var afriend = $("#addFriend").val();
// 	aObj ={'type':'addFriend' , 'aFriend':afriend}
// 	ws.send(JSON.stringify(aObj))
// 	$("#jGRoom").val('')
// })
//
// $('#remove_friend').click(function (e) {
// 	var rfriend = $("#removeFriend").val();
// 	rObj ={'type':'removeFriend' , 'rFriend':rfriend}
// 	ws.send(JSON.stringify(rObj))
// 	$("#jGRoom").val('')
// })

$('body').on('click', 'a.removeFriend', function(e) {
	e.preventDefault();
	console.log(this.id);
	ws.send(JSON.stringify({type: 'removeFriend', rFriend: this.id}));
	ws.send('{"type":"listFriends"}');
	ws.send('{"type":"listUsers"}');
})

$('body').on('click', 'a.addFriend', function(e) {
	e.preventDefault();
	console.log(this.id);
	ws.send(JSON.stringify({type: 'addFriend', aFriend: this.id}));
})

$('body').on('click', 'a.denyFriend', function(e) {
	e.preventDefault();
	console.log(this.id);
	ws.send(JSON.stringify({type: 'denyFriend', dFriend: this.id}));
	ws.send('{"type":"listFriends"}');
	ws.send('{"type":"listFriendReqs"}');
	ws.send('{"type":"listUsers"}');
})

$('body').on('click', 'a.acceptFriend', function(e) {
	e.preventDefault();
	console.log(this.id);
	ws.send(JSON.stringify({type: 'acceptFriend', acFriend: this.id}));
	ws.send('{"type":"listFriends"}');
	ws.send('{"type":"listFriendReqs"}');
	ws.send('{"type":"listUsers"}');
})

$('#send').click(function(e){
	var msg = $("#message").val()
	obj = {'type':'sendMsg','data':msg}
	ws.send(JSON.stringify(obj))
	$("#message").val('')
})
