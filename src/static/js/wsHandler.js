function getCookie(cid) {
	var cookies = document.cookie.split(';');
	var cookie = "";
	for (var cookie of cookies) {
		var cparts = cookie.split('=');
		if (cparts[0] == cid) {
			cookie = cparts[1];
			break;
		}
	}
	return cookie;
}

var ws = new WebSocket('ws://localhost:8888/ws');

ws.onopen = function() {
	ws.send(JSON.stringify({
		type: 'authenticate',
		token: getCookie('token')
	}));
	document.dispatchEvent(new CustomEvent('ws-onOpen'));
};

ws.onmessage = function(e) {
	var msg = JSON.parse(e.data);
	document.dispatchEvent(new CustomEvent('wsMsg-' + msg.type, {detail: msg}));
};
