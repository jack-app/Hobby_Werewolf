
function abcde(){


    var postData = {
        'to':"U5f0607c7da83ff31526d46ac6c1ca009",
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
    };

  push(postData);
}
