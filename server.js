/**
 * Created by shaunwest on 9/6/15.
 */

var express = require('express'); // uses module from node_modules, no jspm_packages
//var expiry = require('static-expiry');
var serveStatic = require('serve-static');
var path = require('path');
var app = express();

/*
function static(dirname, age) {
  return express.static(dirname, { maxAge: age });
}
*/

//app.use(serveStatic(__dirname + '/public/jspm_packages', { maxAge: '3d', setHeaders: setCustomCacheControl } ));
app.use(serveStatic(__dirname + '/public', { setHeaders: setCustomCacheControl} ));

//app.use(expiry(app, { dir: path.join(__dirname, '/public/jspm_packages'), duration: 31556900 }));

//app.use(express.static('public'));

//app.use(static('public/jspm_packages/npm', 1918262667));
//app.use(static('public', 1918262667));

app.get('*', function (req, res) {
  /*if (req.url.indexOf("/jspm_packages/") === 0) {
    console.log('setting cache');
    res.setHeader("Cache-Control", "public, max-age=2592000");
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  }*/
  res.sendFile(__dirname + '/public/index.html');
});

function setCustomCacheControl(res, path) {
  if (path.indexOf('/jspm_packages/') !== -1) {
    // Custom Cache-Control for HTML files
    //res.setHeader('Cache-Control', 'public, max-age=0')
    res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
  }
}

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
