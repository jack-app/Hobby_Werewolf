
var access_token = "x9g3fJFqnkJDaU6Y4Me0CJlpD6cxB6NgV3WWnzfn8QnmavomCLRSWx1tKiTMcjBbbvU5nqpO/WonNms0N8V+d2qMXK8s1h+wmWcmptNMKc4SXHcdxbfERbr/QXLCii5Q2XjHLXxwx9xEutA3qRRNfQdB04t89/1O/w1cDnyilFU=";


var sheet = SpreadsheetApp.openById("1Heb6XE2rqb0xLMqDPDlWmadTyLaMLgryQX3s6-wHc78")

//var start = sheet.getRange().getValue();

//メイン
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var data = sheet.getSheetByName('log1').getRange(1, 1).setValue(json.events);
  //細切れにしてみる

  var replyToken = json.events[0].replyToken;

  var sourceType = json.events[0].source.type;
  var gotText = json.events[0].message.text;

  var userId =json.events[0].source.userId;

//グルチャから送られてきてた場合
  if (sourceType == "group"){

  var groupId = json.events[0].source.groupId;
//    var groupId = "うなぎ";
  var page = sheet.getSheetByName('groupData');
  var glow = findRow(page,groupId,3);
  //グループのデータがないとき
    if (glow == 0){
      glow = findRow(page,"",3);
      Logger.log(glow);
      page.getRange(glow,3).setValue(groupId);
      page.getRange(glow,4).setValue(0);

    }

    var gflug = page.getRange(glow,4).getValue();
    var chk = check(gotText,gflug);
    switch (chk) {
      case 0:
        gflug = 1
        page.getRange(glow,4).setValue(gflug)

        break;
      default:

    }

//個ちゃの場合
  }else{


  }




//  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log1').getRange(2, 1).setValue(json.events);
  var time = json.events[0].timestamp / 1000;


  reply(replyToken)
}


function reply(replyToken){

  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
  };
  var postData = {
    "replyToken" :replyToken,
    "messages" : [
      {
        'type':'text',
        'text':"うごいたー",
      }
    ]
 };
  var options = {
    "method" : "post",


    "headers" : headers,
    "payload" : JSON.stringify(postData),
  };

  return UrlFetchApp.fetch(url, options);
}



function push(to,postData){

  var url = "https://api.line.me/v2/bot/message/push";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
  };
   var postData = {
    "to" : to,
    "messages" : [
      {
        'type':'text',
        'text':text,
      }
    ]
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


function check(word,f){
  switch (word) {
    case "開始":
    if (f == 0){
      return 0;
    }
      break;
    default:
      return -1;
  }
}

function abcde(){
/*  var page = sheet.getSheetByName('groupData');
  var gflug = page.getRange(glow,4).getValue();
  Logger.log(gflug);
  */
  var chk = check("開");
  Logger.log(chk);
}
