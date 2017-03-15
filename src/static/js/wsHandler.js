
function getToken() {
	var cookies = document.cookie.split(';');
	var token = "";
	console.log(cookies);
	for (var cookie of cookies) {
		var cparts = cookie.split('=');
		if (cparts[0] == 'token') {
			token = cparts[1];
			break;
		}
	}
	
	return token;
}