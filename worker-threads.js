const express = require('express');
const app = express();
const Worker = require('webworker-threads').Worker;

app.get('/', (req, res) => {
  const worker = new Worker(function() {
    this.onmessage = function() {
      let counter = 0;

      while (counter < 10000000) {
        counter++;
      }

      postMessage();
    };
  });

  worker.onmessage = function(message) {
    console.log(message.data);
    res.send('' + message.data);
  };

  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
});
app.listen(3000);
