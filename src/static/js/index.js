$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});


		ws.send(JSON.stringify({
			type: 'authenticate',
			token: token
		}));
	}