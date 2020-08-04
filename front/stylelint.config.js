module.exports = {
    extends: ['stylelint-config-standard'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'variants',
                    'responsive',
                    'screen',
                    'for',
                    'use',
                ],
            },
        ],
        'declaration-empty-line-before': null,
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
        'number-no-trailing-zeros': true,
        'value-keyword-case': null,
        'indentation': 4,
    },
};
