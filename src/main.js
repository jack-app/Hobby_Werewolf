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
  var type = json.events[0].type;
  var userId = json.events[0].source.userId;
  if (type == 'unfollow') {
    var ulow = findRow(SHEET_D, userId, 3);
    SHEET_D.getRange(ulow, 3, 1, 8).setValues(["", "", "", "", "", "", "", ""]);
  }
  var sourceType = json.events[0].source.type;
  var gotText = json.events[0].message.text;



//グルチャから送られてきてた場合
  if (sourceType ==  "group") {

    var groupId = json.events[0].source.groupId;
    if (type == 'join') {
        gReplyJoin(replyToken);
    }

    var glow = findRow(SHEET_G,groupId,3);
    //グループのデータがないとき
    if (glow == 0){
        glow = findRow(SHEET_G,"",3);
        SHEET_G.getRange(glow,3).setValue(groupId);
        SHEET_G.getRange(glow,4).setValue(0);

    }

    var gflug = SHEET_G.getRange(glow, 4).getValue();
    var chk = check(gotText, gflug);
    switch (chk) {
      //ゲーム開始ー
      case 0:
        SHEET_G.getRange(glow, 4).setValue(1);
        gReplyStart(replyToken);
        break;
      //参加ー
      case 1:
        var ulow = findRow(SHEET_D,userId,3);
        if (ulow == 0){
            ulow = findRow(SHEET_D,"",3);
            SHEET_D.getRange(ulow,3).setValue(userId);
            SHEET_D.getRange(ulow,6).setValue(groupId+c);
            setName(userId,ulow);
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
          SHEET_G.getRange(glow,5).setValue(c+1);
          gReplyJoin(replyToken);
        }else{
          var postData = {
              "replyToken" :replyToken,
              "messages" : [
                {
                  'type':'text',
                  'text':"ほかのゲーム終わらせてや！",
                },
              ],
          }
        }

        break;
      //しめきりー
      case 2:
        SHEET_G.getRange(glow,4).setValue(2);
        gReplyJoinEnd(replyToken);

        break;
      //はい
      case 3:
        var c = SHEET_G.getRange(glow,5).getValue();
        if (c >= 5) {
          SHEET_G.getRange(glow,4).setValue(4);
          gReplyGame(replyToken,groupId)
        }else {
          SHEET_G.getRange(glow,4).setValue(1);
          gReplyNotGame(replyToken)
        }
        break;
      //いいえ
      case 4:
        SHEET_G.getRange(glow,4).setValue(1);
        gReplyJoinEndCancel(replyToken)
        break;
      //投票
      case 5:
        SHEET_G.getRange(glow,4).setValue(6);
        gReplyVote1(groupId,replyToken,glow);
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
        reply(postData);
    }


//個ちゃの場合
  }else{


    // 趣味が全員分登録された時、グループに開始メッセージを送る
      userChat(userId,gotText,replyToken);
    var ulow = findRow(SHEET_D,userId,3);
    var groupId = SHEET_D.getRange(ulow,5).getValue();
    var glow = findRow(SHEET_G,groupId,3);
    var gData = SHEET_G.getRange(glow,3,1,4).getValues();
    var gflug = gData[0][1];



    var pCount = gData[0][2];
    var hCount = gData[0][3];
    if ((pCount === hCount) && (gflug === 4)) {
      SHEET_G.getRange(glow,4).setValue(5);
      gPushGameStart(groupId,glow,hCount);
    }
    if ((gflug === 6) && (gotText.slice(-3) === "に投票")){
      voting1(Number(gotText.slice(0,-3)),glow,replyToken,pCount,ulow);
    }
    if ((gflug === 7) && (gotText.slice(-3) === "に投票")){
      debug(11);
      voting2(Number(gotText.slice(0,-3)),glow,replyToken,pCount,ulow);
    }
  }




//  SpreadsheetApp.openById(spreadsheet_id).getSheetByName('log1').getRange(2, 1).setValue(json.events);
  var time = json.events[0].timestamp / 1000;



}
