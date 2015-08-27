/**
 * Created by shaunwest on 8/23/15.
 */

var fs = require('fs');
var browserify = require('browserify');
var babelify = require('babelify');

var b = browserify("./src/main.js", { cache: {}, packageCache: {}, debug: true });

b.transform(babelify.configure({
    plugins: ["object-assign"]
  }))
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(fs.createWriteStream("./public/js/bundle.js"));

module.exports = b;
