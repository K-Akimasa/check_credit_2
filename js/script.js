$(function() {
	var $test_chk1 = $('#test_chk1');
	console.log($test_chk1);
	var $test_chkbox1 = $test_chk1.find(':checkbox')
	console.log($test_chkbox1);
	$test_chk1.change(function(){
		if ($(this).is(':checked')) {
			console.log("on");
		} else {
			console.log("off");
		}
	});
})