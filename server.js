// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const app = express();
app.use(express.static('build'));

// set
app.set('port', 9090);
app.set('env', 'production');

// get
const port = app.get('port');

app.get('/', function(req, res) {
  // eslint-disable-next-line no-undef
  res.sendFile(path.join(__dirname + 'build/index.html'));
});

app.listen(port, () => {
  console.log('App is running at http://localhost:%d', port);
});
