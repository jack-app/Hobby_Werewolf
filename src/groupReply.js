function gReplyStart(replyToken){


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
  reply(postData);

}

function gReplyJoin(replyToken){
  var postData = {
      "replyToken" :replyToken,
      "messages" : [
        {
          'type':'text',
          'text':"参加受け付けた",
        },
      ],
  }
  reply(postData);
}

function gReplyJoinEnd(replyToken){
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
  reply(postData);
}

function gReplyGame(replyToken){
  var postData = {
      "replyToken" :replyToken,
      "messages" : [
        {
          'type':'text',
          'text':"はじめっぞー",
        },
        {
          'type':'text',
          'text':"個人チャットにとんで趣味を登録してください。",
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
   };



  reply(postData);
}

function gReplyNotGame(replyToken){
  var postData = {
      "replyToken" :replyToken,
      "messages" : [
        {
          'type':'text',
          'text':"たりねーぞー",
        }
      ]
   };
   reply(postData);
}

function gReplyJoinEndCancel(replyToken){
  var postData = {
      "replyToken" :replyToken,
      "messages" : [
        {
          'type':'text',
          'text':"はよしろー",
        }
      ]
   };
  reply(postData);
}

function gPushGameStart(groupId,glow,c){
  var postData = {
    "to" : groupId,
   "messages" : [
     {
       'type':'text',
       'text':"それではゲームを始めます",
     },
   ]

  }
  push(postData);
  var wol1 = Math.floor(Math.random()*c);
  var wol2 = wol1;
  while (wol1 === wol2) {
    wol2 = Math.floor(Math.random()*c);
  }
  SHEET_G.getRange(glow,7).setValue(wol1);
  SHEET_G.getRange(glow,8).setValue(wol2);
  ulow = findRow(SHEET_D,groupId+wol1,6);
  SHEET_D.getRange(ulow,8).setValue(1);
  var hob1 = SHEET_D.getRange(ulow,7).getValue()
  ulow = findRow(SHEET_D,groupId+wol2,6);
  SHEET_D.getRange(ulow,8).setValue(2);
  var hob2 = SHEET_D.getRange(ulow,7).getValue()
   postData = {
    "to" : groupId,
   "messages" : [
     {
       'type':'text',
       'text':"1つ目の趣味は"+hob1+"です。",
     },

    {
       'type':'text',
       'text':"2つ目の趣味は"+hob2+"です。",
     },
     {
       'type':'text',
       'text':"では以上2つの趣味がそれぞれだれのものなのか、話し合って推測してください",
     },
     {
     'type':'text',
     'text':"話し合いが終わったら　投票　と送ってください。",
    }
   ]
   }
  push(postData);
}

function gReplyVote1(groupId,replyToken,glow){
  var c=SHEET_G.getRange(glow,5).getValue();
  /*
  var colum=[]
  var number = 0
  for (var i = c; i > 0; i -= 3) {
    colum.push((i>2)+(i>1)+(i>0));
  }
  var columns=['text':"誰に投票する？",];
  for (var i = 0; i < colum.length; i++) {
    var element=[];
    for (var j = 0; j < colum[i]; i++) {
      var ulow = findRow(SHEET_D,groupId+number,6);
      var uName = SHEET_D.getRange(ulow,4).getValue();
      action ={
        'type':'postback',
        'label':uName
        'data':number,
        'displayText':"投票した！",
      }
      element.push(action)
      number++;
    }
    columns.push(element);
  }
  //ulow=findRow(SHEET_D,groupId+c,6);
   /*var postData = {
    "replyToken" :replyToken,
    "messages" : [
      {
          'type':'template',
          'altText':"牡丹",
          'template':{
            'type':'carousel',
            'columns':{
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

          }
        },
      ]
    ]
  };
  reply(postData);*/
}
