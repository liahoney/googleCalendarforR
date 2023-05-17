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
            "off",
            "ignorePackages",
            {
                "ts": "never",
                "js": "never"
            }
        ],
        "import/allowImportingTsExtensions": [0, { allowExtensions: true }],
        "no-unused-vars": "off",
        "no-undef": "off"
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