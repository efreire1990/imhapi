'use strict';

const Code = require('code');   // assertion library
const Lab = require('lab');
const Hapi = require('hapi');
const Server = require('../lib/index.js');
const Version = require('../lib/version');

const internals = {};


const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;



describe('Test de index', () => {

    it('Inicia el servidor y devuelve un objeto server', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            expect(server).to.be.instanceof(Hapi.Server);
            server.stop(done);
        });
    });

    it('Test que verificar la función init()', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();
            server.stop(done);
        });
    });

    it('Un test que inicia el servidor en el puerto indicado', (done) => {

        Server.init(8000, (err, server) => {

            expect(err).to.not.exist();
            expect(server.info.port).to.equal(8000);
            server.stop(done);
        });
    });

    it('errores de registro de un plugin', (done) => {

        const orig = Version.register;

        Version.register = function (server, options, next) {

            Version.register = orig;
            return next(new Error('Fail'));
        };

        Version.register.attributes = {
            name: 'Versión diferente'
        };

        Server.init(0, (err, server) => {

            expect(err).to.exist();
            expect(err.message).to.equal('Fail');
            done();
        });
    });
});
