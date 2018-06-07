
function abcde(){
  var c=SHEET_G.getRange(glow,5).getValue();

  var colum=[];
  var number = 0;
  for (var i = c; i > 0; i -= 3) {
    colum.push((i>2)+(i>1)+(i>0));
  }
  var element=[];
  element.push('text':"誰に投票する？",);
  for (var i = 0; i < colum.length; i++) {

    for (var j = 0; j < colum[i]; i++) {
      var ulow = findRow(SHEET_D,groupId+number,6);
      var uName = SHEET_D.getRange(ulow,4).getValue();
      action ={
        'type':'postback',
        'label':uName,
        'data':number,
        'displayText':"投票した！"
      }
      element.push(action)
      number ++;
    }
    columns.push(element);
  }

  /*  var postData = {
        'to':"U5f0607c7da83ff31526d46ac6c1ca009",
        "messages" : [
          {
              'type':'template',
              'altText':"牡丹",
              'template':{
                'type':'carousel',
                'columns':[

                  {
                    'text':"参加友達",
                    'actions':[
                      {
                        'type':'postback',
                        'label':"わとそん",
                        'data':0,
                        'displayText':"投票した！",
                      },
                      {
                        'type':'postback',
                        'label':"ぴーたー",
                        'data':1,
                        'displayText':"投票した！",
                      },
                    ]
                  },
                ],
              },
          },
        ]
    }
       Logger.log(postData);*/
}
