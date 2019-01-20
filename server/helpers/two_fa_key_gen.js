var randomize = require("randomatic");
const constant = require('../contants');

exports.randomAplhabetTwoFa = function() {
  boolRandom = true;
  var random = "";
  while (boolRandom == true) {
    random = randomize("A", constant.TWO_FA_DISABLE_LENGTH);
    console.log(random);
    var arr = Array.apply(null, Array(26)).map(function(x, i) {
      return 0;
    });
    for (i = 0; i < random.length; i++) {
      console.log(random.charCodeAt(i) - 65);
      if (arr[random.charCodeAt(i) - 65] == 0) {
        arr[random.charCodeAt(i) - 65] = 1;
        if (i == constant.TWO_FA_DISABLE_LENGTH - 1) {
          boolRandom = false;
          break;
        }
      } else {
        break;
      }
    }
  }

  console.log("final result: " + random);
  return random
};

// randomAplhabet();

exports.randomNumericTwoFa = function() {
  var random = randomize("A0", constant.TWO_FA_DISABLE_LENGTH * 2);
  var arr = [];
  console.log(random);
  for (i = 0; i < random.length; i = i + 2) {
    console.log(random.substring(i, i + 2));
    arr.push(random.substring(i, i + 2));
  }
  console.log(arr);
  return arr;
};


exports.generateOtp = function(){
  return randomize('0',6)

};

exports.generateDisableTwoFaKey = function(){
  return randomize('?', 3, {chars: '012345',exclude: '6789'})
};


exports.generatePasswordKey = function(){
  return randomize('A0', 20);

}