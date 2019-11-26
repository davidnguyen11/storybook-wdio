const express = require('express');

const app = express();
app.use(express.static('build'));

// set
app.set('port', 9090);
app.set('env', 'production');

// get
const port = app.get('port');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'build/index.html'));
});

app.listen(port, () => {
  console.log('App is running at http://localhost:%d', port);
});
