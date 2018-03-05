const express = require('express');
const app = express();
const query = require('./query');
const get = require('./service/get');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.listen(3000);

query.init(() => {
    app.get('/', require('./service/get'));
    app.post('/', require('./service/get'));

});
