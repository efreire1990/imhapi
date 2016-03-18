'use strict';

// Load modules

const Package = require('../package.json');


// Declare internals

const internals = {
    response: {
        version: Package.version
    }
};


exports.register = function (server, options, next) {

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

    return next();
};

exports.register.attributes = {
    name: 'Version'
};
