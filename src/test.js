
function fghij(){
    var c=6//SHEET_G.getRange(glow,5).getValue();
    var groupId = "Ce5b79f92aff6b0a050d7a70ea67bfeea"
  var colum=[];
  var number = 0;
  for (var i = c; i > 0; i -= 3) {
    colum.push((i>2)+(i>1)+(i>0));
  }
var columns=[];
  for (var i = 0; i < colum.length; i++) {
var actions=[];
    for (var j = 0; j < 3; j++) {
      if ( j < colum[i]){
        var ulow = findRow(SHEET_D,groupId+number,6);
        var uName = SHEET_D.getRange(ulow,4).getValue();
        action ={
          'type':'postback',
          'label':uName,
          'data':number,
          'displayText':"投票した！"
        }
      }else {
        action =  {
                        'type':'message',
                        'label':"からっぽ",

                        'text':"しかし、投票できなかった！",
                      };
      }
      actions.push(action);
       number ++;
    };

     var element = {
        'text' : "誰に投票する？",
        'actions' : actions,
     }
    columns.push(element);


  }

 var postData = {
        'to':"U5f0607c7da83ff31526d46ac6c1ca009",
        "messages" : [
          {
              'type':'template',
              'altText':"牡丹",
              'template':{
                'type':'carousel',
                'columns': columns
              },
          },
        ]
    }
       push(postData)
}
