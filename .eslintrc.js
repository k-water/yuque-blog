module.exports = {
  extends: 'eslint-config-beidou',
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/forbid-prop-types': [1, { forbid: ['any'] }],
    'react/prefer-stateless-function': 0,
    'no-template-curly-in-string': 0,
    'react/no-danger': 0,
    'react/prop-types': 0,
    'no-mixed-operators': 0,
    'max-len': [
      'error',
      { "code": 120 }
    ]
  },
};
