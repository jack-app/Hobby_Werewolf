/*
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
*/

function voting1(d,glow,replyToken,c,ulow){
   // var ulow = findRow(SHEET_D,userId,3);
    var uV = SHEET_D.getRange(ulow,9).getValue();
    var uNumber = SHEET_D.getRange(ulow,6).getValue().slice(-1);
    if (uV == ""){
      if ((d != uNumber) && (d <= c)){
        debug(uNumber);
        var postData = {
            "replyToken" :replyToken,
            "messages" : [
              {
                'type':'text',
                'text':"投票受け付けたで！",
              }
            ]
         };
        reply(postData);
        SHEET_D.getRange(ulow,9).setValue(d);

         var vCounter = Number(SHEET_G.getRange(glow,9).getValue());
         SHEET_G.getRange(glow,9).setValue(vCounter+1);
         var pCounter = Number(SHEET_G.getRange(glow,5).getValue());
         if ((vCounter+1) === pCounter){
           SHEET_G.getRange(glow,4).setValue(7);
         }
      }else {
        var uName = SHEET_D.getRange(ulow,4).getValue();
        var postData = {
            "replyToken" :replyToken,
            "messages" : [
              {
                'type':'text',
                'text':"その人にはちょっと投票できへんねん！投票しなおしてや！",
              }
            ]
         };
        reply(postData);
      }
    }
};


function voting2(d,glow,replyToken,c,ulow){

    //var ulow = findRow(SHEET_D,userId,3);
    var uV = SHEET_D.getRange(ulow,10).getValue();
    var uNumber = SHEET_D.getRange(ulow,6).getValue().slice(-1);
    var voted1 = SHEET_G.getRange(glow, 10).getValue();
    if (uV == ""){
      if ((d != uNumber) && (d <= c) && (d != voted1)){
        var postData = {
            "replyToken" :replyToken,
            "messages" : [
              {
                'type':'text',
                'text':"投票受け付けたで！",
              }
            ]
         };
        reply(postData);
         SHEET_D.getRange(ulow,10).setValue(d);
         var vCounter = Number(SHEET_G.getRange(glow,9).getValue());
         SHEET_G.getRange(glow,9).setValue(vCounter+1);
         var pCounter = Number(SHEET_G.getRange(glow,5).getValue());
         if ((vCounter+1) === pCounter){
           SHEET_G.getRange(glow,4).setValue(8);
         }
      }else {
        var uName = SHEET_D.getRange(ulow,4).getValue();
        var postData = {
            "replyToken" :replyToken,
            "messages" : [
              {
                'type':'text',
                'text':"その人にはちょっと投票できへんねん！投票しなおしてや！",
              }
            ]
         };
        reply(postData);
      }
    }
};
