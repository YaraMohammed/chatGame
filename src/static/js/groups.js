// $(function(){
// 	ws = new WebSocket("ws://localhost:8888/ws");
//
// 	ws.onopen = function(){
// 		var cookies = document.cookie.split(';');
// 		var token = "";
// 		console.log(cookies);
// 		for (var cookie of cookies) {
// 			var cparts = cookie.split('=');
// 			if (cparts[0] == 'token') {
// 				token = cparts[1];
// 				break;
// 			}
// 		}
// 		// console.log(token);
// 		// ws.send('{"type":"authenticate","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lZGhhdCJ9.YTIPJC5HqvBNT3OaDVX84r8TXv5AsrJBvRkaxDGltgk"}')
// 		ws.send(JSON.stringify({
// 			type: 'authenticate',
// 			token: token
// 		}));
// 		groups ={'type':'listGroups'}
// 		ws.send(JSON.stringify(groups))
// 		group ={'type':'listGroup'}
// 		ws.send(JSON.stringify(group))
// 	}
//
// 	ws.onmessage = function(e){
// 		temp = JSON.parse(e.data)
// 		if(temp['type'] == 'groupList'){
// 			//TODO add click event to image --> chatHistory Handler
// 			temp['list'].forEach(function(grp){
// 				img = '<img class="allGroupsContent" src="userIcon.png" width="50px" height="50px" />'
// 				$('#allGroupsContainer').append(img)
// 			})
// 		}
//
//
// 		else if(temp['type'] == 'listOwnGroup'){
// 			//TODO add click event to image --> chatHistory Handler
// 			temp['gList'].forEach(function(grop){
// 				img = '<img class="myGroupsContent" src="userIcon.png" width="50px" height="50px" />'
// 				$('#myGroupsContainer').append(img)
// 				// console.log(img)
// 			})
// 		}
//
// 		else if(temp['type'] == 'authResponse'){
// 			$('#username').text(temp['user']);
// 		}
//
// 		else
// 			console.log(temp)
// 	}
// })

document.addEventListener('ws-onOpen', function(e) {
	ws.send('{"type":"listGroups"}');
	ws.send('{"type":"listGroup"}');
})

document.addEventListener('wsMsg-groupList', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.list.forEach(function(grp){
		img = '<img class="allGroupsContent" src="userIcon.png" width="50px" height="50px" />'
		$('#allGroupsContainer').append(img)
	})
});

document.addEventListener('wsMsg-listOwnGroup', function(e) {
	//TODO add click event to image --> chatHistory Handler
	e.detail.gList.forEach(function(grop){
		// var tdCount = 14;
		// trHtmlBegin = '<tr>';
		// trHtmlEnd = '</tr>';
		// cellHtml ='<td class="myGroupsNames"><img class="myGroupsContent" src="userIcon.png" width="50px" height="50px"><BR>Group Name<BR><a href="#">Leave Group</a></td>';
		// $('#myGroupsTable').append(trHtmlBegin)
		// for (var i = 0; i < tdCount; i++)
		// {
		// 	cellHtml ='<td class="myGroupsNames"><img class="myGroupsContent" src="userIcon.png" width="50px" height="50px"><BR>Group Name<BR><a href="#">Leave Group</a></td>';
		// }
		// trHtmlEnd = '</tr>';
		var item = '<span><table style="display: inline"><tr><td><img class="myGroupsContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>Group Name</td></tr><tr><td><a href="#">Leave Group</a></td></tr></table></span>';
		$('#myGroupsTable').append(item);
		// console.log(img)
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
