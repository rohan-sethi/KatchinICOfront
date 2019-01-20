var forever = require('forever');

var child = new forever.Forever('server/app.js', {
  max: 3,
  silent: true,
  args: []
});

child.on('exit',function(){
  console.log("hello dear i am stopping");
});

child.start();

child.on('start', function(){
  console.log("i a running");
});