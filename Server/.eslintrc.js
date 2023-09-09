module.exports = {
    parser: '@typescript-eslint/parser',
    "env": {
        "browser": true,
        "es2021": true
    },
    plugins: ['@typescript-eslint'],
    'extends': [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'standard'
      ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    }
}
