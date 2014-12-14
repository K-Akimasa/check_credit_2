/* 単位管理オブジェクト */
var credit_num = {
	kiban_total : 0,			// 基盤教育単位数
	humanity_total : 0,			// 人文科目単位数
	society_total : 0,			// 社会科学単位数
	kiban_non_comp_sbjs : [0],	// 基盤教育未履修科目
	
	// すべての単位数を合計する
	getTotal : function() {
		var total = this.kiban_total + this.humanity_total + this.society_total;
		return total;
	}
};

/*
 * ダイアログの設定
 */
$(function() {
	/*** 初期化 ***/
	var $result = $('#result');
	
	// ダイアログのメッセージをセットする
	$result.click(function () {
		// 基盤教育の未履修科目を取得する
		var non_sbjs_msg = '';
		var kiban_non_length = credit_num.kiban_non_comp_sbjs.length;
		for (var i = 0; i < kiban_non_length; i++) {
			if (credit_num.kiban_non_comp_sbjs[i]) {
				console.log(credit_num.kiban_non_comp_sbjs[i]);
				non_sbjs_msg += credit_num.kiban_non_comp_sbjs[i] + "<br />"
			}
		}
		
		// 基盤教育の結果設定
		$('#popup p').html(
			"基盤教育基礎科目 : "	+ String(credit_num.kiban_total)	+ "<br />"
			+ "人文科目 : "			+ String(credit_num.humanity_total)	+ "<br />"
			+ "社会科目："			+ String(credit_num.society_total)	+ "<br />"
			+ "計 : " 				+ String(credit_num.getTotal())		+ "<br />"
		);
		
		// 基盤教育の未履修科目の設定
		$('#popup #kiban_non_sbjs p').html(non_sbjs_msg);
	});
});

/*
 * 基盤教育科目
 */
$(function() {
	/*** 初期化 ***/
	var $container = $('#基盤教育科目');
	var $checkbox = $container.find(':checkbox');// チェックボックス
	var $humanity_select = $container.find('#人文科目');// セレクト
	var $society_select = $container.find('#社会科学');// セレクト
	var checkbox_length = $checkbox.length;// チェックボックスの数
	// 未履修科目配列credit_num.kiban_non_comp_sbjs[]の初期化
	// 最初はすべて未履修
	for (var i = 0; i < checkbox_length; i++) {
		if (!$checkbox.eq(i).is(':checked')) {// チェックが入っていないならば
			credit_num.kiban_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
		} else {// チェックが入っているならば
			credit_num.kiban_non_comp_sbjs[i] = '';
		}
	}
	
	/*** イベント設定 ***/
	// 基盤教育基礎科目のチェックボックスのイベント設定
	$checkbox.change(function(){
		for (var i = 0; i < checkbox_length; i++) {
			if (!$checkbox.eq(i).is(':checked')) {
				credit_num.kiban_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
			} else {
				credit_num.kiban_non_comp_sbjs[i] = '';
			}
		}
		if ($(this).is(':checked')) {
			credit_num.kiban_total += parseInt($(this).attr('value'));
		} else {
			credit_num.kiban_total -= parseInt($(this).attr('value'));
		}
	});
	// 基盤教育基礎科目（人文科目）のセレクトのイベント設定
	$humanity_select.change(function(){
		credit_num.humanity_total = parseInt($(this).val()) * 2;
	});
	// 基盤教育基礎科目（社会科目）のセレクトのイベント設定
	$society_select.change(function(){
		console.log($(this).attr('name'));
		console.log(parseInt($(this).val()));
		credit_num.society_total = parseInt($(this).val()) * 2;
	});
});

/*
 * 共通専門基礎科目
 */
$(function() {
});

/*
 * 専門必修科目
 */
$(function() {
});

/*
 * 専門選択A郡
 */
$(function() {
});