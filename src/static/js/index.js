$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});

// ws.onopen = function (event) {
// 		var cookies = document.cookie.split(';');
// 		var token = "";
// 		console.log(cookies);
// 		for (var cookie of cookies) {
// 			var cparts = cookie.split('=');
// 			if (cparts[0] == 'token') {
// 				token = cparts[1];
// 				break;
// 			}
// 	}
// 		// console.log(token);
		// ws.send('{"type":"authenticate","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lZGhhdCJ9.YTIPJC5HqvBNT3OaDVX84r8TXv5AsrJBvRkaxDGltgk"}')
		ws.send(JSON.stringify({
			type: 'authenticate',
			token: token
		}));
	}

// $("#username").val()