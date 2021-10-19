const { encryptAsString } = require('./binding');

module.exports.templateTags = [
    {
        name: 'pigy',
        displayName: 'Pigy',
        description: 'Generate PGP Bouncycastle',
        args: [
            {
                displayName: 'Contents',
                description: 'Contents to be encrypted',
                type: 'string',
                defaultValue: ''
            },
            {
                displayName: 'Public Key',
                description: 'A key use to encrypt the content',
                type: 'file',
            }
        ],
        async run(context, content, publicKey) {
            console.log({ publicKey, content })
            return await encryptAsString(publicKey, content);
        }
    }
]
