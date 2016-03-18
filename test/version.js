'use strict';


const Code = require('code');
const Lab = require('lab');
const Package = require('../package.json');
const Server = require('../lib/index.js');


const internals = {};


const lab = exports.lab = Lab.script();
const describe = lab.experiment;
const it = lab.test;
const expect = Code.expect;


describe('/version', () => {

    it('Devuelve la version del json', (done) => {

        Server.init(0, (err, server) => {

            expect(err).to.not.exist();

            server.inject('/version', (res) => {

                expect(res.statusCode).to.be.equal(200);
                expect(res.result).to.deep.equal({ version: Package.version });

                server.stop(done);
            });
        });
    });
});
