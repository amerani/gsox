#!/usr/bin/env node
const { exec } =  require('child_process');
const chalk = require('chalk');
const async = require('async');

console.log(chalk.bgBlue('installing gsox packages...')+"\n")

const commands = ["@gsox/core", "@gsox/schema", "@gsox/client", "@gsox/server"]
      .map(x => `npm install ${x}`);

const tasks = commands.map(c => {
      return function() {
            const p = exec(c);
            p.on('close', () => console.log(
                  `${chalk.bgBlue('gsox')} ${chalk.green('successfully executed')} ${chalk.blue(c)}`
            ))
      }
})

async.parallel(tasks, function() {
      console.log(chalk.bgGreen(`gsox is ready to use!`))
})