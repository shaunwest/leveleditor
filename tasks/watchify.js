/**
 * Created by shaunwest on 8/23/15.
 */

var fs = require('fs');
//var browserify = require('./browserify.js');
var watchify = require('watchify');

//var w = watchify(browserify);
//w.bundle().on('data', function() {});
var browserify = require('browserify');
var babelify = require('babelify');

var b = browserify(watchify.args);
var w = watchify(b);

w
  .add('./src/main.js')
  .transform(babelify.configure({
    plugins: ["object-assign"]
  }))
  .bundle()
  .on('data', function() {})
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(fs.createWriteStream("./public/js/bundle.js"));

module.exports = w;