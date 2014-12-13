$(function() {
	var total = 0;
	var $test = $('.test');
	console.dir($test);
	console.dir($test.length);
	$test.change(function(){
		if ($(this).is(':checked')) {
			console.log("on");
			console.log("\t" + $(this).attr('name'));
			console.log("\t" + $(this).attr('value'));
			total += parseInt($(this).attr('value'));
		} else {
			console.log("off");
			total -= parseInt($(this).attr('value'));
		}
		console.log("total : " + total);
	});
	
})