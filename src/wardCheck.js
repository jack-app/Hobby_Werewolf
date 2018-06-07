
function check(word,f){
  switch (word) {
    case "開始":

      if (f == 0){
        return 0;
        }
    case "参加":
      if (f == 1){
        return 1;
      }
      break;
    case "締切":
      if (f == 1){
        return 2;
      }
    case "はい":
      if (f == 2) {
        return 3;
      }
    case "いいえ":
     if (f == 2){
       return 4;
     }
     case "投票":
      if (f == 5) {
        return 5;
      }

    default:
      return -1;
  }
}
