#!/usr/bin/env node
const { exec } =  require('child_process');
const chalk = require('chalk');

console.log(chalk.bgCyan('installing gsox packages...\n'))

const command = ["@gsox/schema", "@gsox/core", "@gsox/client", "@gsox/server"]
      .map(x => `npm install ${x}`)
      .join(' && ');
console.log(command)
const npmi = exec(command);

npmi.stdout.on('data', data => {
      console.log(chalk.blue(data))
});
npmi.stderr.on('data', data => {
      console.log(chalk.red(data));
});
npmi.on('close', code => {
      if(code === 0) {
            console.log(chalk.green(`\nsuccessfully installed gsox packages`))
      } else {
            console.log(chalk.red(`\nerror installing gsox packages`))
      }
})