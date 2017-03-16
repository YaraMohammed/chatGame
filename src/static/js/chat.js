function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.addEventListener('ws-onOpen', function(e) {
	ws.send(JSON.stringify({type: "setRoom", room: getParameterByName("group")}));
})

document.addEventListener('wsMsg-chatHistory', function(e) {
	e.detail.msgs.forEach(function(msg){
		console.log(msg)
		var uname = Object.keys(msg)[0];
		$('#chatText').append(uname+": "+msg[uname]+'\n');
	})
});

document.addEventListener('wsMsg-message', function(e) {
	$('#chatText').append(e.detail.name+": "+e.detail.data);
});

// document.addEventListener('wsMsg-groupList', function(e) {
// 	//TODO add click event to image --> chatHistory Handler
// 	e.detail.list.forEach(function(grp){
// 		var item = '<span><table style="display: inline"><tr><td><img class="allGroupsContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>Group Name</td></tr><tr><td><a href="#">Join Group</a></td></tr></table></span>';
// 		$('#allGroupsTable').append(item);
// 	})
// });

// document.addEventListener('wsMsg-listOwnGroup', function(e) {
// 	//TODO add click event to image --> chatHistory Handler
// 	e.detail.gList.forEach(function(grop){
// 		var item = '<span><table style="display: inline"><tr><td><img id="'+grop+'" class="myGroupsContent" src="userIcon.png" width="50px" height="50px"></td></tr><tr><td>'+grop+'</td></tr><tr><td><a href="#">Leave Group</a></td></tr></table></span>';
// 		$('#myGroupsTable').append(item);
// 	})
// });

var str = ""

$(function(){
	$(".sendButton").click(function() {
		var msg = $("#chatMessage").val();
		console.log('222')
		ws.send(JSON.stringify({type: "sendMsg", data: msg}));
		$("#chatMessage").val("");
	})

	// webSocket= new WebSocket("ws://localhost:8888/ws");

	// webSocket.onmessage = function(e){
	// 	temp = JSON.parse(e.data)
	// 	type = temp.type
	// 	if(type == "message"){
	// 		str = temp.name+" : "+temp.data
	// 		$("p").append("</br>"+str+"</br>")
	// 		}
	// 	else if(type == "chatHistory"){
	// 		msgs = temp.msgs
	// 		keys = Object.keys(msgs);
	// 		keys.forEach(function(message) {
	// 			var name = Object.keys(msgs[message])
	// 			name.forEach(function(key){
	// 				var value = msgs[message][key]
	// 				str = name[0]+" : "+value
	// 				$("p").append("</br>"+str+"</br>")
	// 			})
	// 		})
	// 	}

	// 	else if(temp['type'] == 'authResponse'){
	// 		$('#username').text(temp['user']);
	// 	}
	}
	
/*	$('#create_group').click(function (e) {
		var room = $("#gRoom").val();
		gObj ={'type':'createGroup' , 'gRoom':room}
		webSocket.send(JSON.stringify(gObj))
		$("#gRoom").val('')
	})

	$('#join_group').click(function (e) {
		var jroom = $("#jGRoom").val();
		jObj ={'type':'joinGroup' , 'jGRoom':jroom}
		webSocket.send(JSON.stringify(jObj))
		$("#jGRoom").val('')
	})

	$('#leave_group').click(function (e) {
		var lroom = $("#lGRoom").val();
		lObj ={'type':'leaveGroup' , 'lGRoom':lroom}
		webSocket.send(JSON.stringify(lObj))
		$("#lGRoom").val('')
	})
*/
/*	$('#add_friend').click(function (e) {
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
	})*/

)
