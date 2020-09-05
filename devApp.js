const nodemon = require('nodemon');
const ngrok = require('ngrok');
const PORT = process.env.PORT || 5000;

nodemon({
  script: 'index.js',
  ext: 'js',
});

let url = null;

nodemon
  .on('start', async () => {
    if (!url) {
      url = await ngrok.connect({ port: PORT });
      console.log(`ngrok public URL for you: ${url}`);
    }
  })
  .on('quit', async () => {
    await ngrok.kill();
  });
