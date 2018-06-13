function userChat(userId, gotText, replyToken) {
    // （できれば）ルールって言われた時
    if(gotText == "@ルール") {

    }

    var ulow = findRow(SHEET_D,userId,3);
    var groupId = SHEET_D.getRange(ulow,5).getValue();
    var glow = findRow(SHEET_G,groupId,3);
    var gflug = SHEET_G.getRange(glow, 4).getValue();
    // ゲーム中の個人メッセージ
    var hob = SHEET_D.getRange(ulow, 7).getValue();
    if (gflug === 4){
      if(hob == "") {
        SHEET_D.getRange(ulow, 7).setValue(gotText);
        var hCount =SHEET_G.getRange(glow, 6).getValue();
        SHEET_G.getRange(glow, 6).setValue(hCount+1);
        var postData = {
            "replyToken": replyToken,
            "messages": [
                {
                    "type": "text",
                    "text": gotText + "が自分の趣味やな！わかったで！"
                }
            ],
        };
        reply(postData);
      }else {
        var postData = {
            "replyToken": replyToken,
            "messages": [
                {
                    "type": "text",
                    "text": "もう趣味は登録されとるで！"
                }
            ],
        };
        reply(postData);
      }
   }
}
