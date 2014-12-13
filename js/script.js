var total = 0;
$(function() {
	var $test = $('.test');
	console.dir($test);
	console.log($test.length);
	
	var $select = $('select');
	console.dir($select);
	
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
		$('#popup p').html("全部で" + total + "です");
	});

	$select.change(function(){
		console.log($(this).attr('name'));
		console.log(parseInt($(this).val()));
	});
});

$(function() {
	$('#popup p').html("全部で" + total + "です");
});