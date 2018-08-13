// Press ^C at any time to quit.
// package name: (npm-pack-cli)
// version: (1.0.0)
// description: npm pack cli
// entry point: (index.js)
// test command:
// git repository: (https://github.com/ZengTianShengZ/npm-pack-cli.git)
// keywords:
// author:
// license: (ISC)
// About to write to /Users/zengtiansheng/Documents/qtshe/gitStore/npm-pack-cli/package.json:
const program = require('commander');
const readline = require('readline');

program
  .version('0.0.1')
  .option('init, --main', 'init npm pack cli')
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
    const name = await createInterface('package name:')
    const version = await createInterface('version:')
    const description = await createInterface('description:')
    const keywords = await createInterface('keywords:')
    const author = await createInterface('author:')
    console.log(name,version,description,keywords,author);
    
  } catch (error) {
    
  }
}

initPackage()

if (program.mian) {
  console.log('initCLI');
  
}