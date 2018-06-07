function postcheck(d, f, glow, replyToken) {
  if (f === 6) {
    var ulow = findRow(SHEET_D,userId,3);
    var uV = SHEET_D.getRange(ulow,9).getValue();
    var uNumber = SHEET_D.getRange(ulow,9).getValue();
    uNumber.slice(-1);
    if (uV !== ""){
      if (uV != uNumber){
         SHEET_D.getRange(ulow,9).setValue(d);
         var counter = SHEET_G.getRange(glow,9).getValue();
         SHEET_G.getRange(glow,9).setValue(counter+1);
      }else {
        var uName = SHEET_D.getRange(ulow,4).getValue();

      }
    }
  }else if (f === 7) {
    var ulow = findRow(SHEET_D,userId,3);
    uV = SHEET_D.getRange(ulow,10).getValue();
  }
}
