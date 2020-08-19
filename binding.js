const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const executableFilePath = path.join(__dirname, 'pgp-starbucks.jar');


function encryptAsString(publicKeyPath, content) {
    return new Promise((resolve, reject) => {

        if (!publicKeyPath || !content) {
            reject('public key path and data are required');
            return;
        }

        const result = spawn('java', ['-jar', executableFilePath, publicKeyPath, content]);
        const chunks = [];


        result.stdout.on('data', (data) => {
            chunks.push(...data);
        });
        
        result.stdout.on('end', () => {
            const content = Buffer.from(chunks).toString();
            resolve(content.trim());
        });

        result.stderr.on('data', (err) => {
            const msg = Buffer.from(err).toString();
            reject(msg);
        })
    });
}

module.exports = {
    encryptAsString
}