var ws = new WebSocket("ws://localhost:8888/ws");

ws.onopen = function(){
	ws.send(JSON.stringify({
		type: 'authenticate',
		token: getToken()
	}));
};

ws.onmessage = function (e) {
	temp = JSON.parse(e.data);
	if(temp['type'] == 'authResponse'){
		$('#username').text(temp['user']);
	}
};

ws.onclose = function (event){
	console.log("connection closed");
};

$("#regPasswordConfirm").on('keyup', function(){
	if ($("#regPassword").val() != $("#regPasswordConfirm").val()) {
		$("#registerButton").prop('disabled', true);
		$("#registerButton").html('Password Not Matched');
	}
	else{
		$("#registerButton").prop('disabled', false);
		$("#registerButton").html('Continue');
	}
});