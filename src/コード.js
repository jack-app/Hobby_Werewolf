var access_token = "x9g3fJFqnkJDaU6Y4Me0CJlpD6cxB6NgV3WWnzfn8QnmavomCLRSWx1tKiTMcjBbbvU5nqpO/WonNms0N8V+d2qMXK8s1h+wmWcmptNMKc4SXHcdxbfERbr/QXLCii5Q2XjHLXxwx9xEutA3qRRNfQdB04t89/1O/w1cDnyilFU=";


var sheet = SpreadsheetApp.openById("1Heb6XE2rqb0xLMqDPDlWmadTyLaMLgryQX3s6-wHc78")
var sheetG = sheet.getSheetByName('groupData');
var sheetD = sheet.getSheetByName('data1');

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

    var glow = findRow(sheetG,groupId,3);
    //グループのデータがないとき
    if (glow == 0){
        glow = findRow(sheetG,"",3);
        sheetG.getRange(glow,3).setValue(groupId);
        sheetG.getRange(glow,4).setValue(0);

    }

    var gflug = sheetG.getRange(glow,4).getValue();
    var chk = check(gotText,gflug);
    switch (chk) {
        //ゲーム開始ー
      case 0:
          sheetG.getRange(glow,4).setValue(1);

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
        //参加ー
      case 1:
        var ulow = findRow(sheetD,userId,3);
        if (ulow == 0){
            ulow = findRow(sheetD,"",3);
            sheetD.getRange(ulow,3).setValue(userId);
        //            var url = "https://api.line.me/v2/bot/group/"+groupId+"/member/"+userId
        //            var uname =

        }
        var nowGroupId = sheetD.getRange(ulow,5).getValue()
        if (groupId == nowGroupId){
          var postData = {
              "replyToken" :replyToken,
              "messages" : [
                {
                  'type':'text',
                  'text':"うごたー",
                }
              ]
           };
        }else if (nowGroupId == "") {


          sheetD.getRange(ulow,5).setValue(groupId);
          var c = sheetG.getRange(glow,5).getValue();
          sheetG.getRange(glow,5).setValue(c+1)
          var postData = {
              "replyToken" :replyToken,
              "messages" : [
                {
                  'type':'text',
                  'text':"参加受け付けた",
                },
              ],
          }
        }else{
          var postData = {
              "replyToken" :replyToken,
              "messages" : [
                {
                  'type':'text',
                  'text':"ほかのゲーム終わらせろ",
                },
              ],
          }
        }

        break;
        //しめきりー
     case 2:
        sheetG.getRange(glow,4).setValue(2);
        var postData = {
            "replyToken" :replyToken,
            "messages" :[
              {
                'type':'template',
                'altText':"牡丹",
                'template':{
                  'type':'confirm',
                  'text':"締め切っていいんか？",
                  'actions':[
                    {
                      'type':'message',
                      'label':"はい",
                      'text':"はい",
                    },
                   {
                      'type':'message',
                      'label':"いいえ",
                      'text':"いいえ",
                    },

                ],
              }
            }
            ],
        }

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
      friendAdd();
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
    case "参加":
      if (f == 1){
        return 1;
      }
      break;
    case "締切":
      if (f == 1){
        return 2;
      }
      break;
    case "はい":
      if (f == 2) {
        return 3;
      }
    case "いいえ":
     if (f == 2){
       return 4;
     }

    default:
      return -1;
  }
}

function abcde(){


    var postData = {
        'to':"U5f0607c7da83ff31526d46ac6c1ca009",
        "messages" :[
          {
            'type':'template',
            'altText':"牡丹",
            'template':{
              'type':'confirm',
              'text':"締め切っていいんか？",
              'actions':[
                {
                  'type':'message',
                  'label':"はい",
                  'text':"はい",
                },
               {
                  'type':'message',
                  'label':"いいえ",
                  'text':"いいえ",
                },

            ],
          }
        }
        ],
    };

  push(postData);
}