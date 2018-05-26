
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
      //ゲーム開始ー
      case 0:
        gflug = 1;
        page.getRange(glow,4).setValue(gflug);

        var postData = {
          "replyToken" :replyToken,
        //  "replyToken" :replyToken,
          "messages" : [
            {
              'type':'text',
              'text':"参加押せ、その前に追加しろ",
            },
          {
              'type':'template',
              'altText':"牡丹",
              'template':{
                'type':'buttons',
                'text':"参加友達",
                'actions':[
                  {
                    'type':'message',
                    'label':"参加",
                    'text':"参加",
                  },
                 {
                    'type':'uri',
                    'label':"友達追加",
                    'uri':"https://line.me/R/ti/p/krua6R8zjP",
                  },
                ]
              }
            },
          ]
        };
        break;
      default:
        var postData = {
            "replyToken" :replyToken,
            "messages" : [
              {
                'type':'text',
                'text':"うごいたー",
              }
            ]
         };
    }

//個ちゃの場合
  }else{


  }




//  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log1').getRange(2, 1).setValue(json.events);
  var time = json.events[0].timestamp / 1000;


  reply(postData)
}


function reply(postData){

  var url = "https://api.line.me/v2/bot/message/reply";
  var headers = {
    "Content-Type" : "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + access_token,
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
    'Authorization': 'Bearer ' + access_token,
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
  var postData = {
    'to':"U5f0607c7da83ff31526d46ac6c1ca009",
  //  "replyToken" :replyToken,
    "messages" : [
      {
        'type':'text',
        'text':"参加押せ、その前に追加しろ",
      },
    {
        'type':'template',
        'altText':"牡丹",
        'template':{
          'type':'buttons',
          'text':"参加友達",
          'actions':[
            {
              'type':'message',
              'label':"参加",
              'text':"参加",
            },
           {
              'type':'uri',
              'label':"友達追加",
              'uri':"https://line.me/R/ti/p/krua6R8zjP",
            },
          ]
        }
      },
    ]
  };
  push(postData);
}
