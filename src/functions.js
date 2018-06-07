
function reply(postData){

  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  var options = {
    "method" : "post",


    "headers" : headers,
    "payload" : JSON.stringify(postData),
  };

  return UrlFetchApp.fetch(url, options);
}



function push(postData){

  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + ACCESS_TOKEN,
  };

  var options = {
    "method" : "post",
    "headers" : headers,
    "payload" : JSON.stringify(postData)
  };

    return UrlFetchApp.fetch(url, options);

}

//
function findRow(sheet,val,col){
  var dat = sheet.getDataRange().getValues(); //受け取ったシートのデータを二次元配列に取得

 for(var i=1;i<dat.length;i++){
    if(dat[i][col-1] === val){
     return i+1;

    }
  }
  return 0;
}
