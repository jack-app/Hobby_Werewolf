function postcheck(d, f, glow, replyToken) {
  if (f === 6) {
    var ulow = findRow(SHEET_D,userId,3);
    var uV = SHEET_D.getRange(ulow,9).getValue();
    var uNumber = SHEET_D.getRange(ulow,9).getValue();
    uNumber.slice(-1);
    if (uV !== ""){
      if (uV != uNumber){
         SHEET_D.getRange(ulow,9).setValue(d);
         var vCounter = SHEET_G.getRange(glow,9).getValue();
         SHEET_G.getRange(glow,9).setValue(vCounter++);
         var pCounter = SHEET_G.getRange(glow,5).getValue();
         if (Vcounter === pCounter){
            
         }
      }else {
        var uName = SHEET_D.getRange(ulow,4).getValue();
        var postData = {
            "replyToken" :replyToken,
            "messages" : [
              {
                'type':'text',
                'text':"自分には投票できへんねん" + uName + "はんは投票しなおしてや！",
              }
            ]
         };
        reply(postData);
      }
    }
  }else if (f === 7) {
    var ulow = findRow(SHEET_D,userId,3);
    uV = SHEET_D.getRange(ulow,10).getValue();
  }
}
