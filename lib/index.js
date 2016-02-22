'use strict';

// Load modules

const Hapi = require('hapi');
const Package = require('../package.json');

// Declare internals

const internals = {
    response: {
        version: Package.version
    }
};

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 8000 });

server.route({

    method: 'GET',
    path: '/version',
    config: {
        description: 'Devuelve la version del servidor',
        handler: (request, reply) => {

            return reply(internals.response);
        }
    }
});

server.start((err) => {

    if (err) {
        Hoek.assert(!err, err);
    }

    console.log('Server started at: ' + server.info.uri);
});
