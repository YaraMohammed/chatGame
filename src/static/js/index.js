var user = ''

document.addEventListener('wsMsg-authResponse', function(e) {
	user = e.detail.user;
	console.log(user);
	$('#username').text(e.detail.user);
})

$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});
