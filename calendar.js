/**
* カレンダー生成関数
* 
* @param int year 年
* @param int month 月
* @param array params カレンダーパラメータ（CSSなど、機能拡張したいときは必要なパラメータを増やす）
* @return string htmlコード
* @version 1.0
*/
function calendar(year, month, params){
	// フィルタリング
	year = parseInt(year);
	month = parseInt(month);
	// 初期値
	var day = ["日","月","火","水","木","金","土"];//曜日（0～6）
	var code = "";//HTMLコードを代入していくコード
	if(params == null){
		// param引数がない場合
		params = createParams();
	}else{
		params = createParams(params);
	}
	// パラメータを整形
	if(params['table_id'] != ''){
		params['table_id'] = ' id=' + params['table_id'];
	}
	if(params['css_position'] != ''){
		params['css_table'] += ' ' + params['css_position'];
	}

	// 日付を設定
	var nowDate = new Date();				//現在の日付
	var now_year = nowDate.getFullYear();	//現在の西暦
	var now_month = nowDate.getMonth()+1;	//現在の月
	// 日付のデフォルト値
	var TextYear = parseInt(now_year);
	var TextMonth = parseInt(now_month);
	// 日付が指定されている場合
	if(year != null && month != null){
		TextYear = year;
		TextMonth = month;
	}
	// 月末日を取得
	var nextYear = TextYear;
	var nextMonth = parseInt(TextMonth)+1;
	if(nextMonth >= 13){
		nextYear = parseInt(TextYear)+1;
		nextMonth = 1;
	}
	var nextMonthDate = new Date(nextYear, parseInt(nextMonth)-1, 0);
	var maxDate = nextMonthDate.getDate();

	////////////////////
	// カレンダーhtml生成
	////////////////////
	//年月の見出し



	//ここからテーブルの作成
	code += "<table border='1'" + params['table_id'];

	code += " class='" + params['css_table'] + "'><tr>";
	code += "<caption><p class='title1'>"+TextYear+"年"+TextMonth+"月</p></caption>";
	//曜日のテーブル
	for(i=0; i<day.length; i++){
		code += "<td>"+day[i]+"</td>";
	}
	code += "</tr><tr>";

	// 月初日のDateオブジェクトを取得
	var date = new Date(TextYear,TextMonth-1,1);
	//月初日以前の空テーブルを作成
	for(i=0; i<date.getDay(); i++){
		code += "<td></td>";
	}

	// 日付セルを生成
	for(i=1; i<=maxDate; i++){
		// 日曜なら改行する
		if(date.getDay()==0 && i!=1){
			code += "</tr><tr>";
		}
		//現在日をマークアップ
		if(now_year==TextYear && now_month==TextMonth && i==nowDate.getDate()){
			code += "<td class='" + params['css_markup'] + "'>"+i+"</td>";
		}else{
					code += "<td>"+i+"</td>";
				}

			// 最大日付を超えた場合は空にする
		date.setDate(date.getDate()+1);
		if(i==maxDate){
			while(date.getDay()!==0){
				code +="<td></td>";
				date.setDate(date.getDate()+1);
			}
		}
	}

	code += "</tr></table>";
	// カレンダーを返却（出力）
	return code;
}


/**
* 前後の年月取得関数
*
* @param int year 年
* @param int month 月
* @param string param last:先月 next:来月
* @return array(year, month)
* @version 1.0
*/
function getAroundMonth(year, month, param){

	year = parseInt(year);
	month = parseInt(month);
	if(param == 'last'){
		month -= 1;
		if(month == 0){
			year -= 1;
			month = 12;
		}
	}else if(param == 'next'){
		month += 1;
		if(month >= 13){
			year += 1;
			month = 1;
		}
	}
	//console.log(year,month)
 return [year, month];
}

/**
* カレンダー用のパラメータを生成する関数
* 
* @param array params
* @return array
* @version 1.0
*/
function createParams(params){

	var return_params =[];
	// デフォルト値設定
	return_params['css_table'] = 'default';	// テーブルCSS
	return_params['css_markup'] = 'mark'; // TodayマークアップCSS
	return_params['table_id'] = ''; // テーブルのID名
	return_params['css_position'] = ''; //  カレンダーテーブルの位置CSS

	// パラメータが指定されている場合は置き換える
	if(params != null){
		for( var key in params){
			if( key in return_params){
				return_params[key] = params[key];
			}
		}
	}
	console.log(return_params);
	return return_params;

}

