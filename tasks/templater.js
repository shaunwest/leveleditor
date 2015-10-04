var file = require('file'),
  fs = require('fs');

function concatFiles(path, type) {
  var allCombined = '';

  if (!path || !type) {
    throw 'templater: Error: path and type are required.';
  }

  file.walkSync(path, function (dirPath, dirs, files) {
    allCombined += files
      .filter(function (file) {
        return (file.substr(-(type.length + 1)) === '.' + type);
      })
      .map(function (file) {
        var filePath =  './' + dirPath + '/' + file,
          fileContents = fs.readFileSync(filePath, 'utf8'); 
        return fileContents;
      })
      .reduce(function (combined, fileContents) {
        return combined + fileContents;
      }, '');
  });

  return allCombined;
}


var sourceDirectory = process.argv[2],
  sourceFile = process.argv[3],
  targetFile = process.argv[4],
  type = process.argv[5] || 'tpl';

console.log('templater: Concatenating files of type \'' + type + '\' found in \'' + sourceDirectory + '\'');
var combinedTpls = concatFiles('./src', type);

fs.readFile(sourceFile, 'utf8', function (err, data) {
  var fileContents = data.replace('{{ inject:templates }}', combinedTpls);
  fs.writeFile(targetFile, fileContents, function () {
    console.log('templater: Injected into \'' + targetFile + '\'');
  });
});
