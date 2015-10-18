var sass = require('node-sass'),
  gaze = require('gaze'),
  argv = require('yargs').argv,
  fs = require('fs');

// still need to minify

function buildSass() {
  sass.render({
    file: './sass/main.scss',
    outFile: './public/css/main.css'
  }, function (err, result) {
    if (err) throw err;
    fs.writeFile('./public/css/main.css', result.css, function(err) {
      if (!err) {
        console.log('Wrote sass');
      }
    }); 
  });
}

if (argv.w) {
  gaze('sass/**/*.scss', function(err, watcher) {
    // On changed/added/deleted 
    this.on('all', function(event, filepath) {
      console.log('Sass file changed');
      buildSass();
    });
  });
} else {
  buildSass();
}
