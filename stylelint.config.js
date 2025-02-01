module.exports = {
  extends: ['stylelint-config-standard'],
  // ignoreFiles: '*.vue',
  fix: true,
  // emitError: false,
  // failOnError: false,
  // emitWarning: true,
  plugins: ['stylelint-scss'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'extend'],
      },
    ],
    'selector-type-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-descending-specificity': null,
  },
}
