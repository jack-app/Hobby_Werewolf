
var access_token = "x9g3fJFqnkJDaU6Y4Me0CJlpD6cxB6NgV3WWnzfn8QnmavomCLRSWx1tKiTMcjBbbvU5nqpO/WonNms0N8V+d2qMXK8s1h+wmWcmptNMKc4SXHcdxbfERbr/QXLCii5Q2XjHLXxwx9xEutA3qRRNfQdB04t89/1O/w1cDnyilFU=";


var sheet = SpreadsheetApp.openById("1Heb6XE2rqb0xLMqDPDlWmadTyLaMLgryQX3s6-wHc78")

var start = sheet.getRange().getValue();
//メイン
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var data = sheet.getSheetByName('log1').getRange(1, 1).setValue(json.events);
  //細切れにしてみる
  
  var replyToken = json.events[0].replyToken;
  
  var sourceType = json.events[0].source.type;
  
  if (sourceType == "group"){
    var groupId = json.events[0].source.groupId;
  }
  var userId =json.events[0].source.userId;
  
  var gotText = json.events[0].message.text;
 
//  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log1').getRange(2, 1).setValue(json.events);
  var time = json.events[0].timestamp / 1000;
  
  
  reply(json)
}


function reply(json){
  
  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
  };
  var postData = {
    "replyToken" : json.events[0].replyToken,
    "messages" : [
      {
        'type':'text',
        'text':"jgk",
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