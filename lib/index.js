#!/usr/bin/env node

const program = require('commander');
const readline = require('readline');
const path = require('path')
const fs = require('fs')
const ora = require('ora')
const download = require('download-git-repo')
const simpleGit = require('simple-git')()

const _templateUrl = 'ZengTianShengZ/npm-pack-template'
const spinner = ora('download template...🚀  ')
const _defaultProjPath = path.resolve(process.cwd())
const _defaultProjtName = _defaultProjPath.substring(_defaultProjPath.lastIndexOf('/') + 1, _defaultProjPath.length)

let packageInfo = {}

program
  .version('1.0.4')
  .option('init, --init', 'init npm pack cli')
  .parse(process.argv);

const resolve = (dir) => {
  return path.join(__dirname, '../', dir)
}

const getRepositoryUrl = () => {
  try {
    simpleGit.listRemote(['--get-url'], (err, url) => {
      if (!err) {
        return url || ''
      }
    });
  } catch (error) {
    return ''
  }
}

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
    console.info(`
==========================🏃
        package info
==========================🏃
{
  name: ${name}
  version: ${version}
  description: ${description}
  keywords: ${keywords}
  author: ${author}
}
    `);
    downLoadTemplate()
  } catch (error) {
    console.log(error);
  }
}

const writePackage = () => {
  const package = require(path.resolve(process.cwd(), 'package.json'));
  package.repository.url = getRepositoryUrl() || ''
  Object.assign(package, packageInfo)
  fs.writeFileSync('package.json',JSON.stringify(package, null, 2), 'utf-8'); 
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
