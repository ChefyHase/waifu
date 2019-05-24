#! /usr/bin/env node

const Image = require('../index');
const program = require('commander');

program
  .version('0.1.0')
  .option('-s, --set [string]', 'Set your waifu(s)')
  .parse(process.argv);

(async () => {
  const image = new Image();
  try {
    if (typeof program.set !== 'undefined') {
      image.writeConf(program.set);
    }
    image.loadConf();
    await image.fetch();
    image.display();
  } catch (e) {
    console.log(e);
  }
})();