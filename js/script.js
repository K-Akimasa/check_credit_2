var total = 0;
var kiban_total = 0;
var humanity_total = 0;
var society_total = 0;

$(function() {
	/*** 初期化 ***/
	var $container = $('#基盤教育科目');
	var $checkbox = $container.find(':checkbox');
	var $humanity_select = $container.find('#人文科目');
	var $society_select = $container.find('#社会科学');
	
	/*** イベント設定 ***/
	// 基盤教育基礎科目のチェックボックスのイベント設定
	$checkbox.change(function(){
		if ($(this).is(':checked')) {
			console.log("\t" + $(this).attr('name'));
			console.log("\t" + $(this).attr('value'));
			kiban_total += parseInt($(this).attr('value'));
		} else {
			kiban_total -= parseInt($(this).attr('value'));
		}
		console.log("\t" + "total : " + total);
	});

	// 基盤教育基礎科目（人文科目）のセレクトのイベント設定
	$humanity_select.change(function(){
		console.log($(this).attr('name'));
		console.log(parseInt($(this).val()));
		humanity_total = parseInt($(this).val()) * 2;
		console.log("\t" + humanity_total);
	});
	
	// 基盤教育基礎科目（社会科目）のセレクトのイベント設定
	$society_select.change(function(){
		console.log($(this).attr('name'));
		console.log(parseInt($(this).val()));
		society_total = parseInt($(this).val()) * 2;
		console.log("\t" + society_total);
	});
});

$(function() {
	/*** 初期化 ***/
	var $result = $('#result');
	// ダイアログのメッセージをセットする
	$result.click(function () {
		$('#popup p').html(
			"基盤教育基礎科目 : " + String(kiban_total) + "<br />"
			+ "人文科目 : " + String(humanity_total) + "<br />"
			+ "社会科目：" + String(society_total) + "<br />"
			+ "計 : " + String(kiban_total + humanity_total + society_total) + "<br />"
		);
	});
});