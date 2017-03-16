document.addEventListener('ws-onOpen', function(e) {
	ws.send('{"type":"listGroups"}');
	ws.send('{"type":"listGroup"}');
})

document.addEventListener('wsMsg-groupList', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.list.forEach(function(grp){
		var item = '<span><table style="display: inline"><tr><td><img class="allGroupsContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>Group Name</td></tr><tr><td><a href="#">Join Group</a></td></tr></table></span>';
		$('#allGroupsTable').append(item);
	})
});

document.addEventListener('wsMsg-listOwnGroup', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.gList.forEach(function(grop){
		var item = '<span><table style="display: inline"><tr><td><img class="myGroupsContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>Group Name</td></tr><tr><td><a href="#">Leave Group</a></td></tr></table></span>';
		$('#myGroupsTable').append(item);
	})
});

//add event listener to images to open chat on click
$('body').on('click','img.allGroupsContent', function(e){
	console.log("listening to image")
})

$('#createGroup').click(function (e) {
	var room = $("#gRoom").val();
	gObj ={'type':'createGroup' , 'gRoom':room}
	ws.send(JSON.stringify(gObj))
	$("#gRoom").val('')
})

$('#join_group').click(function (e) {
	var jroom = $("#jGRoom").val();
	jObj ={'type':'joinGroup' , 'jGRoom':jroom}
	ws.send(JSON.stringify(jObj))
	$("#jGRoom").val('')
})

$('#leave_group').click(function (e) {
	var lroom = $("#lGRoom").val();
	lObj ={'type':'leaveGroup' , 'lGRoom':lroom}
	ws.send(JSON.stringify(lObj))
	$("#lGRoom").val('')
})
