function watsonpush1(){
  var glow = 3;
  var groupId = SHEET_G.getRange(glow, 3).getValue();
  var voted1 = SHEET_G.getRange(glow, 10).getValue();
  var vlow1 = findRow(SHEET_D, groupId + voted1, 6);
  var vName1 = SHEET_D.getRange(vlow1, 4).getValue();
  var wlow1 = findRow(SHEET_D, groupId + SHEET_G.getRange(glow, 7).getValue(), 6);
  var hob1 = SHEET_D.getRange(wlow1, 7).getValue();
  var postData = {
    "to" : groupId,
   "messages" : [
     {
       'type':'text',
       'text':hob1 + "は" + vName1 + "はんの趣味ってことになったで！",
     },
     {
       'type':'text',
       'text':"続いて2人目も投票してや！",
     },
     {
         'type':'template',
         'altText':"牡丹",
         'template':{
           'type':'buttons',
           'text':"個チャボタン",
           'actions':[

            {
               'type':'uri',
               'label':"個チャ",
               'uri':"https://line.me/R/ti/p/krua6R8zjP",
             },
           ]
         }
       },
   ]
  }
  push(postData);
  SHEET_G.getRange(glow,9).setValue(0);
  var c=SHEET_G.getRange(glow,5).getValue();
  for (var k = 0; k < c; k++) {

  var columns=[];
  var number = 0;

  var colum=[];
  for (var i = c; i > 0; i -= 3) {
    colum.push((i>2)+(i>1)+(i>0));
  }
  var columns=[];
  for (var i = 0; i < colum.length; i++) {
  var actions=[];
  for (var j = 0; j < 3; j++) {
      if ( (j < colum[i]) && (k !== number) && (number != voted1)){
        var ulow = findRow(SHEET_D,groupId+number,6);
        var uName = SHEET_D.getRange(ulow,4).getValue();
        action ={
          'type':'message',
          'label':uName,
          'text':number+"に投票",
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
   var ulow = findRow(SHEET_D,groupId+k,6);
   var userId = SHEET_D.getRange(ulow,3).getValue();
   var postData = {
          'to':userId,
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
         push(postData);
  }
}

function watsonpush2(){
  var glow = 3;
  var groupId = SHEET_G.getRange(glow, 3).getValue();
  var voted1 = SHEET_G.getRange(glow, 10).getValue();
  var vlow1 = findRow(SHEET_D, groupId + voted1, 6);
       Logger.log(groupId+ voted1);
  var vName1 = SHEET_D.getRange(vlow1, 4).getValue();
  var wlow1 = findRow(SHEET_D, groupId +  SHEET_G.getRange(glow, 7).getValue(), 6);
  var hob1 = SHEET_D.getRange(wlow1, 7).getValue();
  var voted2 = SHEET_G.getRange(glow, 11).getValue();
  var vlow2 = findRow(SHEET_D, groupId + voted2, 6);
  var vName2 = SHEET_D.getRange(vlow2, 4).getValue();
  var wlow2 = findRow(SHEET_D, groupId + SHEET_G.getRange(glow, 8).getValue(), 6);
  var hob2 = SHEET_D.getRange(wlow2, 7).getValue();
  var postData = {
    "to" : groupId,
   "messages" : [
     {
       'type':'text',
       'text':hob2 + "は" + vName2 + "はんの趣味ってことになったで！",
     },
     {
       'type':'text',
       'text':"結果発表や！",
     },
     {
       'type':'text',
       'text':hob1 + "は" +SHEET_D.getRange(wlow1, 4).getValue() + "はんの趣味で",
     },
     {
       'type':'text',
       'text':hob2 + "は" +SHEET_D.getRange(wlow2, 4).getValue() + "はんの趣味や！",
     },
   ]
  }
  push(postData);

  var chk = (vlow1 == wlow1) + (vlow2 == wlow2)
  switch (chk) {
    case 2:
      var postData = {
        "to" : groupId,
       "messages" : [
         {
           'type':'text',
           'text':"見事に両方当てた自分らの勝ちや！",
         },
       ]

      }
      push(postData);
      break;
    case 1:
      var postData = {
        "to" : groupId,
       "messages" : [
         {
           'type':'text',
           'text':"1人当てた自分らの勝ちや！",
         },
       ]

      }
      push(postData);
      break;
    case 0:
      var postData = {
        "to" : groupId,
       "messages" : [
         {
           'type':'text',
           'text':"当てられなかった" + vName1 + "はんと" +　vName2　+ "はんの勝ちや！",
         },
       ]

      }
      push(postData);
      break;
    default:

  }
  var postData = {
    "to" : groupId,
   "messages" : [
     {
       'type':'text',
       'text':"ほなゲームを終わるで！",
     },
   ]

  }
  push(postData);
}


function debug(t){
  var postData = {
    "to" : "U5f0607c7da83ff31526d46ac6c1ca009",
   "messages" : [
     {
       'type':'text',
       'text':t,
     },
   ]

  }
  push(postData);
}
