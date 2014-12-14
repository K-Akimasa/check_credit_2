/* 単位管理オブジェクト */
var credit_num = {
	kiban_total : 0,
	humanity_total : 0,
	society_total : 0,
	kiban_non_comp_sbjs : [0],
	
	getTotal : function() {;
		return (this.kiban_total + this.humanity_total + this.society_total);
	}
};

/*
 *
 */
$(function() {
	/*** 初期化 ***/
	var $result = $('#result');
	// ダイアログのメッセージをセットする
	$result.click(function () {
		var non_sbjs = '';
		var kiban_non_length = credit_num.kiban_non_comp_sbjs.length;
		for (var i = 0; i < kiban_non_length; i++) {
			if (credit_num.kiban_non_comp_sbjs[i]) {
				console.log(credit_num.kiban_non_comp_sbjs[i]);
				non_sbjs += credit_num.kiban_non_comp_sbjs[i] + "<br />"
			}
		}
		$('#popup p').html(
			"基盤教育基礎科目 : " + String(credit_num.kiban_total) + "<br />"
			+ "人文科目 : " + String(credit_num.humanity_total) + "<br />"
			+ "社会科目：" + String(credit_num.society_total) + "<br />"
			+ "計 : " + String(credit_num.getTotal()) + "<br />"
		);
		
		$('#popup #kiban_non_sbjs p').html(non_sbjs);
	});
});

/*
 * 基盤教育科目
 */
$(function() {
	console.log("基盤教育科目");
	/*** 初期化 ***/
	var $container = $('#基盤教育科目');
	var $checkbox = $container.find(':checkbox');
	var $humanity_select = $container.find('#人文科目');
	var $society_select = $container.find('#社会科学');
	var checkbox_length = $checkbox.length;
	for (var i = 0; i < checkbox_length; i++) {
		if (!$checkbox.eq(i).is(':checked')) {
			credit_num.kiban_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
		} else {
			credit_num.kiban_non_comp_sbjs[i] = '';
		}
	}
	/*** イベント設定 ***/
	// 基盤教育基礎科目のチェックボックスのイベント設定
	$checkbox.change(function(){
		//console.log($(this));
		//console.log(checkbox_length);
		//console.log($checkbox.eq(0).is(':checked'));
		for (var i = 0; i < checkbox_length; i++) {
			if (!$checkbox.eq(i).is(':checked')) {
				credit_num.kiban_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
			} else {
				credit_num.kiban_non_comp_sbjs[i] = '';
			}
		}
		if ($(this).is(':checked')) {
			//console.log("\t" + $(this).attr('name'));
			//console.log("\t" + $(this).attr('value'));
			credit_num.kiban_total += parseInt($(this).attr('value'));
		} else {
			credit_num.kiban_total -= parseInt($(this).attr('value'));
		}
		//console.log("\t" + "total : " + credit_num.getTotal());
	});

	// 基盤教育基礎科目（人文科目）のセレクトのイベント設定
	$humanity_select.change(function(){
		//console.log($(this).attr('name'));
		//console.log(parseInt($(this).val()));
		credit_num.humanity_total = parseInt($(this).val()) * 2;
		//console.log("\t" + humanity_total);
	});
	
	// 基盤教育基礎科目（社会科目）のセレクトのイベント設定
	$society_select.change(function(){
		console.log($(this).attr('name'));
		console.log(parseInt($(this).val()));
		credit_num.society_total = parseInt($(this).val()) * 2;
		//console.log("\t" + credit_num.society_total);
	});
});

/*
 * 共通専門基礎科目
 */
$(function() {
	console.log("共通専門基礎科目");
});

/*
 * 専門必修科目
 */
$(function() {
	console.log("専門必修科目");
});

/*
 * 専門選択A郡
 */
$(function() {
	console.log("専門選択A郡");
});