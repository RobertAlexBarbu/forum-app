const fsPromises = require('fs/promises');
const path = require('path');
const { PurgeCSS } = require('purgecss')

const angularPurgeCSS = async () => {
  const angularJsonBuffer = await fsPromises.readFile('./angular.json');
  const angularJson = JSON.parse(angularJsonBuffer.toString());
  const projectName = Object.keys(angularJson.projects)[0];
  const outputPath =  angularJson.projects[projectName].architect.build.options.outputPath;
  let clientPath = path.resolve(__dirname, outputPath);
  if (angularJson.projects[projectName].architect.build.builder === "@angular-devkit/build-angular:application") {
    clientPath = path.join(clientPath, 'browser');
  }
  const files = await fsPromises.readdir(clientPath);
  let cssFile = ''
  for (let file of files) {
    if(file.match(/\.css$/)) {
      cssFile = file;
    }
  }
  const initialFileContent = await fsPromises.readFile(path.join(clientPath, cssFile));
  const initialFileSize = initialFileContent.length / 1000;
  console.log(`⚠ Purging ${cssFile} ...`)
  const purgeCSSResult = await new PurgeCSS().purge({
    content: [path.join(clientPath, 'index.html'), path.join(clientPath,'*.js')],
    css: [path.join(clientPath, cssFile)],
    variables: true,
  })
  await fsPromises.writeFile(path.join(clientPath, cssFile), purgeCSSResult[0].css);
  const newFileSize = purgeCSSResult[0].css.length / 1000;
  console.log('✓ CSS purged successfully');
  console.log(`Initial '${cssFile}' size:`, initialFileSize, 'kb');
  console.log(`New '${cssFile}' size:`,newFileSize, 'kb');
}

angularPurgeCSS().then(() => {

})
