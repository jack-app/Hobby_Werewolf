
var ACCESS_TOKEN = "x9g3fJFqnkJDaU6Y4Me0CJlpD6cxB6NgV3WWnzfn8QnmavomCLRSWx1tKiTMcjBbbvU5nqpO/WonNms0N8V+d2qMXK8s1h+wmWcmptNMKc4SXHcdxbfERbr/QXLCii5Q2XjHLXxwx9xEutA3qRRNfQdB04t89/1O/w1cDnyilFU=";


var SHEET = SpreadsheetApp.openById("1Heb6XE2rqb0xLMqDPDlWmadTyLaMLgryQX3s6-wHc78")
var SHEET_G = SHEET.getSheetByName('groupData');
var SHEET_D = SHEET.getSheetByName('data1');

//var start = SHEET.getRange().getValue();

//メイン
function doPost(e) {
  var json = JSON.parse(e.postData.contents);
  var data = SHEET.getSheetByName('log1').getRange(1, 1).setValue(json.events);
  //細切れにしてみる

  var replyToken = json.events[0].replyToken;

  var sourceType = json.events[0].source.type;
  var gotText = json.events[0].message.text;

  var userId =json.events[0].source.userId;

//グルチャから送られてきてた場合
  if (sourceType == "group"){

    var groupId = json.events[0].source.groupId;

    var glow = findRow(SHEET_G,groupId,3);
    //グループのデータがないとき
    if (glow == 0){
        glow = findRow(SHEET_G,"",3);
        SHEET_G.getRange(glow,3).setValue(groupId);
        SHEET_G.getRange(glow,4).setValue(0);

    }

    var gflug = SHEET_G.getRange(glow,4).getValue();
    var chk = check(gotText,gflug);
    switch (chk) {
        //ゲーム開始ー
      case 0:
          SHEET_G.getRange(glow,4).setValue(1);

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
        var ulow = findRow(SHEET_D,userId,3);
        if (ulow == 0){
            ulow = findRow(SHEET_D,"",3);
            SHEET_D.getRange(ulow,3).setValue(userId);
        //            var url = "https://api.line.me/v2/bot/group/"+groupId+"/member/"+userId
        //            var uname =

        }
        var nowGroupId = SHEET_D.getRange(ulow,5).getValue()
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


          SHEET_D.getRange(ulow,5).setValue(groupId);
          var c = SHEET_G.getRange(glow,5).getValue();
          SHEET_G.getRange(glow,5).setValue(c+1)
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
        SHEET_G.getRange(glow,4).setValue(2);
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
      case 3:
        var c = SHEET_G.getRange(glow,5).getValue();
        if (c >= 5) {
          SHEET_G.getRange(glow,4).setValue(5);
          var postData = {
              "replyToken" :replyToken,
              "messages" : [
                {
                  'type':'text',
                  'text':"はじめっぞー",
                }
              ]
           };
        }else {
          SHEET_G.getRange(glow,4).setValue(1);
          var postData = {
              "replyToken" :replyToken,
              "messages" : [
                {
                  'type':'text',
                  'text':"たりねーぞー",
                }
              ]
           };
        }
        break;
      case 4:
        SHEET_G.getRange(glow,4).setValue(1);
        var postData = {
            "replyToken" :replyToken,
            "messages" : [
              {
                'type':'text',
                'text':"はよしろー",
              }
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
    reply(postData);
//個ちゃの場合
  }else{
    userChat(userId,gotText,replyToken);
  }




//  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log1').getRange(2, 1).setValue(json.events);
  var time = json.events[0].timestamp / 1000;



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