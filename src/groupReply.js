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
        }
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
