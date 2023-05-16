// .eslintrc.js example
module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    rules: {
        "import/extensions": [
            "error",
            'always',
            // "ignorePackages",
            {
                "ts": "never",
                "js": "never"
            }
        ],
        "import/allowImportingTsExtensions": [0, { allowExtensions: true }]
    },
    overrides: [
        {
            "files": ["*.js"],
            "rules": {
                "eslint-disable": "off"
            }
        }
    ],
    plugins: ['import'],


}