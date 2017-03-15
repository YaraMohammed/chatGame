document.addEventListener('wsMsg-authResponse', function(e) {
	$('#username').text(e.detail.user);
})

$('.toggle').on('click', function() {
  $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
  $('.container').stop().removeClass('active');
});
