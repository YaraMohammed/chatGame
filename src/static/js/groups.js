var oGrps = [];

document.addEventListener('ws-onOpen', function(e) {
	ws.send('{"type":"listGroup"}');
	ws.send('{"type":"listGroups"}');
})

document.addEventListener('wsMsg-groupList', function(e) {
	$('#allGroupsTable').html('');
	e.detail.list.forEach(function(grp){
		if (oGrps.indexOf(grp['_id']) == -1)
			var item = '<span><table style="display: inline"><tr><td><img class="allGroupsContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>'+grp['_id']+'</td></tr><tr><td><a class="joinGroup" id="'+grp['_id']+'" href="#">Join Group</a></td></tr></table></span>';
		$('#allGroupsTable').append(item);
	})
});

document.addEventListener('wsMsg-listOwnGroup', function(e) {
	$('#myGroupsTable').html('');
	oGrps = e.detail.gList;
	e.detail.gList.forEach(function(grop){
		var item = '<span><table style="display: inline"><tr><td><a href="/static/chatPage.html?group='+grop+'"><img id="'+grop+'" class="myGroupsContent" src="userIcon.png" width="50px" height="50px"></a></td></tr><tr><td>'+grop+'</td></tr><tr><td><a class="leaveGroup" id="'+grop+'" href="#">Leave Group</a></td></tr></table></span>';
		$('#myGroupsTable').append(item);
	})
});

$('body').on('click','img.myGroupsContent', function(e){
	ws.send('{"type":"setRoom" , "room":"'+this.id+'"}');
})

$('body').on('click', 'a.leaveGroup', function(e) {
	e.preventDefault();
	console.log(this.id);
	ws.send(JSON.stringify({type: 'leaveGroup', lGRoom: this.id}));
	ws.send('{"type":"listGroup"}');
	ws.send('{"type":"listGroups"}');
})

$('body').on('click', 'a.joinGroup', function(e) {
	e.preventDefault();
	console.log(this.id);
	ws.send(JSON.stringify({type: 'joinGroup', jGRoom: this.id}));
	ws.send('{"type":"listGroup"}');
	ws.send('{"type":"listGroups"}');
})

$('#createGroup').click(function (e) {
	var room = $("#gRoom").val();
	gObj ={'type':'createGroup' , 'gRoom':room}
	ws.send(JSON.stringify(gObj))
	$("#gRoom").val('')
	ws.send('{"type":"listGroup"}');
	ws.send('{"type":"listGroups"}');
})

// $('#join_group').click(function (e) {
// 	var jroom = $("#jGRoom").val();
// 	jObj ={'type':'joinGroup' , 'jGRoom':jroom}
// 	ws.send(JSON.stringify(jObj))
// 	$("#jGRoom").val('')
// })
//
// $('#leave_group').click(function (e) {
// 	var lroom = $("#lGRoom").val();
// 	lObj ={'type':'leaveGroup' , 'lGRoom':lroom}
// 	ws.send(JSON.stringify(lObj))
// 	$("#lGRoom").val('')
// })
