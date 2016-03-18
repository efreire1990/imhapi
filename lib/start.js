'use strict';

const Hoek = require('hoek');
const Start = require('./index.js');

Start.init(8000, (err, server) => {

    Hoek.assert(!err, err);
    console.log('Server: ' + server.info.uri);

});
