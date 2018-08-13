const program = require('commander');
const readline = require('readline');
const ora = require('ora')
const download = require('download-git-repo')

const spinner = ora('download template...')
const _defaultProjtName = __dirname.substring(__dirname.lastIndexOf('/') + 1, __dirname.length)
const _templateUrl = 'ZengTianShengZ/npm-pack-template'
let packageInfo = {}

program
  .version('0.0.1')
  .option('init, --init', 'init npm pack cli')
  .parse(process.argv);

const createInterface = (question) => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer)
    });
  })  
}

const initPackage = async () => {
  try {
    const name = await createInterface(`package name(${_defaultProjtName}): `) || _defaultProjtName
    const version = await createInterface('version(1.0.0): ') || '1.0.0'
    const description = await createInterface('description: ')
    const keywords = await createInterface('keywords: ')
    const author = await createInterface('author: ')
    packageInfo = {name, version, description, keywords, author}
    downLoadTemplate()
  } catch (error) {
    console.log(error);
  }
}

const writePackage = () => {
  const package = require('./package.json');
  Object.assign(package, packageInfo)
  fs.writeFileSync('./package.json',JSON.stringify(package, null, 2), 'utf-8'); 
}

const downLoadTemplate = () => {
  spinner.start()
  download(_templateUrl, './', function (err) {
    spinner.stop()
    console.log(err);
    if (!err) {
      writePackage()
    }
  })
}

if (program.init) {
  initPackage()
}
