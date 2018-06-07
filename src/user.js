function userChat(userId,gotText,replyToken){
    //（できれば）ルールって言われた時
    if(gotText == "@ルール") {
        
    }
    
    // ゲーム中の個人メッセージ
    //var gflug = SHEET_G.getRange(glow,4).getValue();
    if(gflug == 4) {
        message = {
            "to": userId,
            "messages": [
                {
                    "type": "text",
                    "text": "Hello, user!"
                }
            ]
        }
        reply(message);
    }
}