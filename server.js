/**
 * Created by shaunwest on 9/6/15.
 */

var express = require('express'); // uses module from node_modules, no jspm_packages
var path = require('path');
var app = express();

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
