var str = ""

$(function(){
	
	p = "<p></p>"		
	$("#chat-body").append(p)

	webSocket= new WebSocket("ws://localhost:8888/ws");
	
	webSocket.onmessage = function(e){
		temp = JSON.parse(e.data)
		type = temp.type
		if(type == "message"){
			str = temp.name+" : "+temp.data
			$("p").append("</br>"+str+"</br>")
			}
		else if(type == "chatHistory"){
			msgs = temp.msgs
			keys = Object.keys(msgs);
			keys.forEach(function(message) {
				var name = Object.keys(msgs[message]) 
				name.forEach(function(key){
					var value = msgs[message][key]
					str = name[0]+" : "+value
					$("p").append("</br>"+str+"</br>")
				})
			})
		}
	}

	$('#send').click(function(e){
		var msg = $("#message").val()
		obj = {'type':'sendMsg','data':msg}
		webSocket.send(JSON.stringify(obj))
		$("#message").val('')
	})

})
