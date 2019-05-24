const fs = require('fs');
const path = require('path');
const Booru = require('danbooru');
const termImg = require('term-img');
const fetch = require('node-fetch');

class Image {
  constructor() {
    this.buffer;
    this.confPath = path.join(process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"], '.waifu.json');
    this.waifus = [];
  }

  writeConf(waifus) {
    const waifu = JSON.stringify(waifus.split(/\s/));
    const json = `{ "waifus": ${waifu} }`;

    fs.writeFileSync(this.confPath, json);
  }

  loadConf() {
    if (!fs.existsSync(this.confPath)) {
      throw new Error('You need to run "waifu -set" at first run!');
    }

    let json = JSON.parse(fs.readFileSync(this.confPath));
    this.waifus = json.waifus;
  }

  async fetch() {
    const index = Math.floor(Math.random() * this.waifus.length);

    const booru = new Booru();
    const posts = await booru.posts({
      limit: 1,
      tags: this.waifus[index] + ' rating:safe',
      random: true
    });

    const url = posts[0].file_url;
    const res = await fetch(url);
    this.buffer = await res.buffer();
  }

  display() {
    termImg(this.buffer, {
      height: '60%'
    });
  }
}

module.exports = Image;