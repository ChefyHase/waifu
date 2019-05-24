const Image = require('../lib/image');
const fs = require('fs');

test('Conf', () => {
  let image = new Image();
  image.writeConf('reisen_udongein_inaba inaba_tewi');

  let json = JSON.parse(fs.readFileSync(image.confPath));
  expect(json.waifus[0]).toBe('reisen_udongein_inaba');
  expect(json.waifus[1]).toBe('inaba_tewi');

  image.loadConf();
  expect(image.waifus[0]).toBe('reisen_udongein_inaba');
  expect(image.waifus[1]).toBe('inaba_tewi');

  fs.unlinkSync(image.confPath);
});

test('fetch', async () => {
  let image = new Image();
  image.writeConf('reisen_udongein_inaba inaba_tewi');
  image.loadConf();
  await image.fetch();

  expect(image.buffer).not.toBeNull();

  image.display();

  fs.unlinkSync(image.confPath);
});