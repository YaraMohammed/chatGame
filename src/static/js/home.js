var ws = new WebSocket("ws://localhost:8888/ws");

ws.onopen = function (event) {
	//ws.send("I'm client"); 
};

ws.onmessage = function (event) {
	console.log(event.data);
};

ws.onclose = function (event){
	console.log("connection closed");
};