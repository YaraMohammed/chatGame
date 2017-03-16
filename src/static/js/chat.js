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
	$('#chatText').append(e.detail.name+": "+e.detail.data+'\n');
});


$(function(){
	$(".sendButton").click(function() {
		var msg = $("#chatMessage").val();
		console.log('222')
		ws.send(JSON.stringify({type: "sendMsg", data: msg}));
		$("#chatMessage").val("");
	})
	}
)