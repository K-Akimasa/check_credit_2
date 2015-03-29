/* 単位管理オブジェクト */
var credit_num = {
	kiban_total : 0, // 基盤教育単位数
	humanity_total : 0,	// 人文科目単位数
	society_total : 0, // 社会科学単位数
	kiban_non_comp_sbjs : [0], // 基盤教育 未履修科目
	cmn_pro_base_total : 0, // 共通専門基礎科目【必修】単位数
	cmn_pro_base_non_comp_sbjs : [0], // 共通専門基礎 未履修科目
	cmn_pro_base_othr_total : 0, // 共通専門基礎科目【必修】単位数
	cmn_pro_total : 0, // 共通専門科目単位数
	pro_req_total : 0, // 専門必修科目単位数
	pro_req_non_comp_sbjs : [0], // 専門必修科目 未履修科目
	pro_sel_A_total : 0,	// 専門選択A群単位数
	pro_sel_A_A_total : 0, // 専門選択A群A単位数
	pro_sel_A_B_total : 0, // 専門選択A群B単位数
	pro_sel_A_C_total : 0, // 専門選択A群C単位数
	pro_sel_A_non_comp_sbjs : [0], 	// 専門選択A群 未履修科目
	
	// 基盤教育の単位数を合計数
	getKibanTotal : function() {
		var kiban_total = this.kiban_total
						+ this.humanity_total
						+ this.society_total;
		return kiban_total;
	},
	
	// すべての単位数を合計する
	getTotal : function() {
		var total = this.kiban_total 
					+ this.humanity_total 
					+ this.society_total
					+ this.cmn_pro_base_total
					+ this.cmn_pro_base_othr_total
					+ this.cmn_pro_total
					+ this.pro_req_total
					+ this.pro_sel_A_total;
		return total;
	}
};

function getRestCredits(total){

	if (total < 124) {
		return '卒業にはあと' + String(124 - total) + '単位必要です';
	}
	else {
		return '卒業に必要な単位数を取得しています';
	}
}

function getProgress(total){
	var percent = Math.floor(total / 124 * 100);
	return ('<label><progress value="' + percent + '" max="' + 100 + '"></progress> （' + percent + '%）</label>');
}

/*********************************
 * 集計結果のダイアログ表示設定
 *********************************/
$(function() {
	/*============*/
	/* 初期化
	/*============*/
	/* 結果表示DOM */
	var $result = $('#result');
	var $rest_credits = $('#rest_credits');
	var $progress = $('#progress');
	var $close_btn = $('.close_btn');
	 /* 各科目DOM */
	var $result_list = $('#集計結果'); 
	var $kiban_non_list = $('#基盤教育科目未履修');
	var $cmn_pro_base_non_list = $('#共通専門基礎科目【必修】未履修');
	var $pro_req_non_list = $('#専門必修科目未履修');
	var $pro_sel_A_non_list = $('#専門選択A群未履修');

	/*==================*/
	/* イベント設定
	/*==================*/
	// resultボタンが押されたら，ダイアログのメッセージをセットする
	$result.click(function () {
		// 基盤教育基礎科目
		$result_list.append(
			'<li class="ui-first-child ui-li-static ui-body-inherit">'
			 + "基盤教育基礎科目 : <br />" + String(credit_num.getKibanTotal()) + " / 28"
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
		// 共通専門基礎科目【必修】
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "共通専門基礎科目(必修)：<br />" + String(credit_num.cmn_pro_base_total) + " / 13"
			 + '</li>'
		);
		// 共通専門基礎科目
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "共通専門基礎科目：<br />" + String(credit_num.cmn_pro_base_othr_total)
			 + '</li>'
		);
		// 共通専門科目
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "共通専門科目：<br />" + String(credit_num.cmn_pro_total)
			 + '</li>'
		);
		// 専門必修科目
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "専門必修科目： <br />" + String(credit_num.pro_req_total) + " / 31"
			 + '</li>'
		);
		// 専門選択A群
		$result_list.append(
			'<li class="ui-li-static ui-body-inherit">'
			 + "専門選択A群： <br />" + String(credit_num.pro_sel_A_total)
			 + '</li>'
		);
		// 合計
		$result_list.append(
			'<li class="ui-last-child ui-li-static ui-body-inherit">'
			 + "合計： <br />" + String(credit_num.getTotal()) + " / 124"
			 + '</li>'
		);
		
		// 進捗状況の表示
		var rest_credits_str = getRestCredits(credit_num.getTotal());
		$rest_credits.append(rest_credits_str);

		var progress_str = getProgress(credit_num.getTotal());
		$progress.append(progress_str);
		
		
		var kiban_non_length = credit_num.kiban_non_comp_sbjs.length;				
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
		for (var i = 0; i < cmn_pro_base_non_length; i++) {
			if (credit_num.cmn_pro_base_non_comp_sbjs[i]) {
				$cmn_pro_base_non_list.append(
					'<li class="ui-li-static ui-body-inherit">'
					+ credit_num.cmn_pro_base_non_comp_sbjs[i]
					+ '</li>'
				);
			}
		}		
		
		var pro_req_non_length = credit_num.pro_req_non_comp_sbjs.length;
		for (var i = 0; i < pro_req_non_length; i++) {
			if (credit_num.pro_req_non_comp_sbjs[i]) {
				$pro_req_non_list.append(
					'<li class="ui-li-static ui-body-inherit">'
					+ credit_num.pro_req_non_comp_sbjs[i]
					+ '</li>'
				);
			}
		}
		
		var pro_sel_A_non_length = credit_num.pro_sel_A_non_comp_sbjs.length;
		if (credit_num.pro_sel_A_A_total === 0) {
			$pro_sel_A_non_list.append(
				'<p>'
				+ '以下の科目から1つ以上履修してください．<br />'
				+ '・計算機システム序論<br />'
				+ '・計算機アーキテクチャI<br />'
				+ '・計算機アーキテクチャII<br />'
				+ '</p>'
			);
		}
			
		if (credit_num.pro_sel_A_B_total === 0) {
			$pro_sel_A_non_list.append(
				'<p>'
				+ '以下の科目から1つ以上履修してください．<br />'
				+ '・コンピュータネットワーク演習<br />'
				+ '・情報伝送論<br />'
				+ '・情報ネットワーク<br />'
				+ '</p>'
			);
		}
			
		if (credit_num.pro_sel_A_C_total === 0) {
			$pro_sel_A_non_list.append(
				'<p>'
				+ '以下の科目から1つ以上履修してください．<br />'
				+ '・コンパイラ<br />'
				+ '・プログラミング言語論<br />'
				+ '</p>'
			);
		}
	});
	
	/* 閉じるボタンが押されたら，liタグのDOMを空にする */
	$close_btn.click(function () {
		$result_list.empty();
		$rest_credits.empty();
		$progress.empty();
		$kiban_non_list.empty();
		$cmn_pro_base_non_list.empty();
		$pro_req_non_list.empty();
		$pro_sel_A_non_list.empty();
	});	
});


//////////////////////////
// 各科目のイベント設定
//////////////////////////
/*********************************
 * 基盤教育科目
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $container = $('#基盤教育科目');
	var $checkbox = $container.find(':checkbox');// チェックボックス
	var $all_chk = $container.find('#kiban_all_chk');
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
	/*== イベント設定
	/*==================*/
	$all_chk.on('click', function() {
		console.log('ok');
		var tmp = 0;
		for (var i = 0; i < checkbox_length; i++) {
			$checkbox.eq(i).prop('checked', true).checkboxradio('refresh');
			if ($checkbox.eq(i).is(':checked')) {
				tmp += parseInt($checkbox.eq(i).attr('value'));
			}
		}
		credit_num.kiban_total = tmp;
	});
	
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
		credit_num.humanity_total = parseInt($(this).val()) * 1;
	});
	
	// 基盤教育基礎科目（社会科目）のセレクトのイベント設定
	$society_select.change(function(){
		credit_num.society_total = parseInt($(this).val()) * 1;
	});
});

/*********************************
 * 共通専門基礎科目【必修】
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $container = $('#共通専門基礎科目【必修】');
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
 * 共通専門基礎科目
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $container = $('#共通専門基礎科目');
	var $checkbox = $container.find(':checkbox');
	var checkbox_length = $checkbox.length;// チェックボックスの数
	
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
	$checkbox.change(function(){
		if ($(this).is(':checked')) {
			credit_num.cmn_pro_base_othr_total += parseInt($(this).attr('value'));
		} else {
			credit_num.cmn_pro_base_othr_total -= parseInt($(this).attr('value'));
		}
	});
});

/*********************************
 * 共通専門科目
 *********************************/
$(function() {
	/*============*/
	/*== 初期化 ==*/
	/*============*/
	var $container = $('#共通専門科目');
	var $checkbox = $container.find(':checkbox');
	var checkbox_length = $checkbox.length;// チェックボックスの数
	
	/*==================*/
	/*== イベント設定 ==*/
	/*==================*/
	$checkbox.change(function(){
		if ($(this).is(':checked')) {
			credit_num.cmn_pro_total += parseInt($(this).attr('value'));
		} else {
			credit_num.cmn_pro_total -= parseInt($(this).attr('value'));
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
			credit_num.pro_req_non_comp_sbjs[i] = $checkbox.eq(i).attr('name');
		} else {// チェックが入っているならば
			credit_num.pro_req_non_comp_sbjs[i] = '';
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
		var cls_name = $(this).attr('class');
		if ($(this).is(':checked')) {
			credit_num.pro_sel_A_total += parseInt($(this).attr('value'));
			switch (cls_name) {
				case 'a':
					credit_num.pro_sel_A_A_total++;
					break;
				case 'b':
					credit_num.pro_sel_A_B_total++;
					break;
				case 'c':
					credit_num.pro_sel_A_C_total++;
					break;
			}
		} else {
			credit_num.pro_sel_A_total -= parseInt($(this).attr('value'));
			switch (cls_name) {
				case 'a':
					credit_num.pro_sel_A_A_total--;
					break;
				case 'b':
					credit_num.pro_sel_A_B_total--;
					break;
				case 'c':
					credit_num.pro_sel_A_C_total--;
					break;
			}
		}
	});
});
