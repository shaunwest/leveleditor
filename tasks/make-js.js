var fs = require('fs'),
  browserify = require('browserify'),
  watchify = require('watchify'),
  uglifyjs = require('uglify-js'),
  gaze = require('gaze'),
  argv = require('yargs').argv;

var SOURCE_FILE = './src/main.js',
 DEST_FILE = './public/js/bundle.js';

var options = {
  debug: true
};

var b, w;
b = browserify(SOURCE_FILE, options);

if (argv.w)  {
  options.cache = {};
  options.packageCache = {};
  b = browserify(SOURCE_FILE, options);
  w = watchify(b);

  w.bundle()
    .on('data', function (data) {
      console.log(data);
    })
    .on('error', function (error) {
      console.log(error);
    })

  w.on('update', function () {
    console.log('UPDATE');
    makeJS(w);
  });

  makeJS(w);
} else {
  b = browserify(SOURCE_FILE, options);
  makeJS(b);
}

/*
makeJS(b);

if (argv.w) {
  watch();
}
*/

function watch() {
  gaze('src/**/*.js', function(err, watcher) {
    this.on('all', function(event, filepath) {
      makeJS(b);
    });
  });
}

function makeJS(b) {
  b.bundle()
    .pipe(fs.createWriteStream(DEST_FILE)
      .on('finish', function () {
        var result;

        console.log('Wrote ', DEST_FILE);

        if (argv.minify) {
          result = uglifyjs.minify(DEST_FILE);
          fs.writeFile(DEST_FILE, result.code, function (err) {
            if (err) throw err;
            console.log('Uglified!');
          }); 
        }
      }
    ));
}

