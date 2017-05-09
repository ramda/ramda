const exec = require('child_process').exec;
const chokidar = require('chokidar');

// One-liner for current directory, ignores .dotfiles
chokidar.watch('./src', {ignored: /\.sw[op]$/}).on('change', (event, path) => {
  exec('npm run build', (error, stdout, stderr) => {
    if (error) {
      console.log(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    exec('cd ../ramda.github.io/ && npm run jsdoc', (error, stdout, stderr) => {
      if (error) {
        console.log(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
  });
  console.log(event, path);
});
