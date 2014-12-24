/* 単位管理オブジェクト */
var credit_num = {
	kiban_total : 0,					// 基盤教育単位数
	humanity_total : 0,					// 人文科目単位数
	society_total : 0,					// 社会科学単位数
	kiban_non_comp_sbjs : [0],			// 基盤教育 未履修科目
	
	cmn_pro_base_total : 0,				// 共通専門基礎科目単位数
	cmn_pro_base_non_comp_sbjs : [0],	// 共通専門基礎 未履修科目
	
	pro_req_total : 0,					// 専門必修科目単位数
	pro_req_non_comp_sbjs : [0],		// 専門必修科目 未履修科目
	
	pro_sel_A_total : 0,				// 専門選択A群単位数
	pro_sel_A_non_comp_sbjs : [0],		// 専門選択A群 未履修科目
	
	// すべての単位数を合計する
	getTotal : function() {
		var total =   this.kiban_total 
					+ this.humanity_total 
					+ this.society_total
					+ this.cmn_pro_base_total
					+ this.pro_req_total
					+ this.pro_sel_A_total;
		return total;
	}
};

/*********************************
 * つぶやき
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $tweet_btn = $('#tweet');
	
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
	$tweet_btn.click(function(){
		window.open('http://twitter.com/home?status='
		+ '取得単位数は' + credit_num.getTotal() + 'です．\n' 
		+ encodeURI(document.title)
		+ encodeURI(location.href),
		'_blank');
  	});
});

/*********************************
 * 集計結果のダイアログ表示設定
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $result = $('#result');		
	var $close_btn = $('#閉じる'); 
	
	var $result_list = $('#集計結果'); 
	var $kiban_non_list = $('#基盤教育科目未履修');
	var $cmn_pro_base_non_list = $('#共通専門基礎科目未履修');
	var $pro_req_non_list = $('#専門必修科目未履修');
	var $pro_sel_A_non_list = $('#専門選択A群未履修');
	
	/* 各DOM */
	var $kiban_chkbox = $('#基盤教育科目 :checkbox');
	var $cmn_pro_base_chkbox = $('#共通専門基礎科目 :checkbox');
	var $pro_req_chkbox = $('#専門必修科目 :checkbox');
	var $pro_sel_A_chkbox = $('#専門選択A群 :checkbox');
		
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
	// ボタンが押されたら，ダイアログのメッセージをセットする
	$result.click(function () {
		// 基盤教育基礎科目
		$result_list.append(
			'<li class="ui-first-child ui-li-static ui-body-inherit">'
			 + "基盤教育基礎科目 : " + String(credit_num.kiban_total)
			 + '</li>'
		);
		// 人文科目
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + " ― 人文科目 : " + String(credit_num.humanity_total)
			 + '</li>'
		);
		// 社会科目
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + " ― 社会科目：" + String(credit_num.society_total)
			 + '</li>'
		);
		// 共通専門基礎科目
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "共通専門基礎科目：" + String(credit_num.cmn_pro_base_total)
			 + '</li>'
		);
		// 専門必修科目
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "専門必修科目：" + String(credit_num.pro_req_total)
			 + '</li>'
		);
		// 専門選択A群
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "専門選択A群：" + String(credit_num.pro_sel_A_total)
			 + '</li>'
		);
		// 合計
		$result_list.append(
			'<li class="ui-last-child ui-li-static ui-body-inherit">'
			 + "合計：" + String(credit_num.getTotal())
			 + '</li>'
		);
		
		// 基盤教育の未履修科目を取得する
		/*
		var non_sbjs_msg = '';
		var kiban_non_length = credit_num.kiban_non_comp_sbjs.length;
		for (var i = 0; i < kiban_non_length; i++) {
			if (credit_num.kiban_non_comp_sbjs[i]) {
				console.log(credit_num.kiban_non_comp_sbjs[i]);
				non_sbjs_msg += credit_num.kiban_non_comp_sbjs[i] + "<br />"
			}
		}
		*/
		
		var kiban_non_length = credit_num.kiban_non_comp_sbjs.length;
		console.log("基盤 : " + kiban_non_length);
						
		for (var i = 0; i < kiban_non_length; i++) {
			if (credit_num.kiban_non_comp_sbjs[i]) {
				$kiban_non_list.append(
					'<li class="ui-li-static ui-body-inherit">'
					+ credit_num.kiban_non_comp_sbjs[i]
					+ '</li>'
				);
			}
		}
		
		
		var cmn_pro_base_non_length = credit_num.cmn_pro_base_non_comp_sbjs.length;
		console.log("共通専門 : " + cmn_pro_base_non_length);
		
		for (var i = 0; i < kiban_non_length; i++) {
			if (credit_num.cmn_pro_base_non_comp_sbjs[i]) {
				$cmn_pro_base_non_list.append(
					'<li class="ui-li-static ui-body-inherit">'
					+ credit_num.cmn_pro_base_non_comp_sbjs[i]
					+ '</li>'
				);
			}
		}		
		
		var pro_req_non_length = credit_num.pro_req_non_comp_sbjs.length;
		console.log("専門必修 : " + pro_req_non_length);
		
		for (var i = 0; i < kiban_non_length; i++) {
			if (credit_num.pro_req_non_comp_sbjs[i]) {
				$pro_req_non_list.append(
					'<li class="ui-li-static ui-body-inherit">'
					+ credit_num.pro_req_non_comp_sbjs[i]
					+ '</li>'
				);
			}
		}
		
		var pro_sel_A_non_length = credit_num.pro_sel_A_non_comp_sbjs.length;
		console.log("専門選択A群 : " + pro_sel_A_non_length);
		
		// 基盤教育の未履修科目の設定
		//$('#popup #kiban_non_sbjs p').html(non_sbjs_msg);
	});
	
	/* 閉じるボタンが押されたら，liを空にする */
	$close_btn.click(function () {
		$result_list.empty();
		$kiban_non_list.empty();
		$cmn_pro_base_non_list.empty();
	});
	
});

/* 各科目のイベント設定 */

/*********************************
 * 基盤教育科目
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
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
	
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
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
		//console.log($(this).attr('name'));
		//console.log(parseInt($(this).val()));
		credit_num.society_total = parseInt($(this).val()) * 2;
	});
});

/*********************************
 * 共通専門基礎科目
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $container = $('#共通専門基礎科目');
	var $checkbox = $container.find(':checkbox');
	var checkbox_length = $checkbox.length;// チェックボックスの数
	
	// 未履修科目配列credit_num.kiban_non_comp_sbjs[]の初期化
	// 最初はすべて未履修
	for (var i = 0; i < checkbox_length; i++) {
		if (!$checkbox.eq(i).is(':checked')) {// チェックが入っていないならば
			credit_num.cmn_pro_base_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
		} else {// チェックが入っているならば
			credit_num.cmn_pro_base_non_comp_sbjs[i] = '';
		}
	}
	
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
	$checkbox.change(function(){
		for (var i = 0; i < checkbox_length; i++) {
			if (!$checkbox.eq(i).is(':checked')) {
				credit_num.cmn_pro_base_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
			} else {
				credit_num.cmn_pro_base_non_comp_sbjs[i] = '';
			}
		}
		if ($(this).is(':checked')) {
			credit_num.cmn_pro_base_total += parseInt($(this).attr('value'));
		} else {
			credit_num.cmn_pro_base_total -= parseInt($(this).attr('value'));
		}
	});
});

/*********************************
 * 専門必修科目
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $container = $('#専門必修科目');
	var $checkbox = $container.find(':checkbox');
	var checkbox_length = $checkbox.length;// チェックボックスの数
	
	for (var i = 0; i < checkbox_length; i++) {
		if (!$checkbox.eq(i).is(':checked')) {// チェックが入っていないならば
			credit_num.cmn_pro_base_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
		} else {// チェックが入っているならば
			credit_num.cmn_pro_base_non_comp_sbjs[i] = '';
		}
	}
	
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
	$checkbox.change(function(){
		for (var i = 0; i < checkbox_length; i++) {
			if (!$checkbox.eq(i).is(':checked')) {
				credit_num.pro_req_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
			} else {
				credit_num.pro_req_non_comp_sbjs[i] = '';
			}
		}
		if ($(this).is(':checked')) {
			credit_num.pro_req_total += parseInt($(this).attr('value'));
		} else {
			credit_num.pro_req_total -= parseInt($(this).attr('value'));
		}
	});
});

/*********************************
 * 専門選択A群
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $container = $('#専門選択A群');
	var $checkbox = $container.find(':checkbox');
	var checkbox_length = $checkbox.length;// チェックボックスの数
	
	for (var i = 0; i < checkbox_length; i++) {
		if (!$checkbox.eq(i).is(':checked')) {// チェックが入っていないならば
			credit_num.pro_sel_A_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
		} else {// チェックが入っているならば
			credit_num.pro_sel_A_non_comp_sbjs[i] = '';
		}
	}
	
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
	$checkbox.change(function(){
		for (var i = 0; i < checkbox_length; i++) {
			if (!$checkbox.eq(i).is(':checked')) {
				credit_num.pro_sel_A_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
			} else {
				credit_num.pro_sel_A_non_comp_sbjs[i] = '';
			}
		}
		if ($(this).is(':checked')) {
			credit_num.pro_sel_A_total += parseInt($(this).attr('value'));
		} else {
			credit_num.pro_sel_A_total -= parseInt($(this).attr('value'));
		}
	});
});