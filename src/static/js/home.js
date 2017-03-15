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
