name = 'yara'
var str = ""

$(function(){
	
	p = "<p></p>"		
	$("#chat-body").append(p)

	webSocket= new WebSocket("ws://localhost:8888/ws");
	
	webSocket.onmessage = function(e){
		temp = JSON.parse(e.data)
		type = temp.type
		console.log(type)
		if(type == "message"){
			str = temp.name+" : "+temp.data
			console.log(str)
			$("p").append("</br>"+str+"</br>")
			}	
	}

	$('#send').click(function(e){
		var msg = $("#message").val()
		obj = {'type':'sendMsg','data':msg}
		webSocket.send(JSON.stringify(obj))
		$("#message").val('')
	})

})
