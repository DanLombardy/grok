module.exports = {
		'rules': {
			'indent': [
				2,
				'tab'
      ],
			'quotes': [
				2,
				'single'
			],
			'linebreak-style': [
				2,
				'unix'
			],
			'semi': [
				2,
				'always'
			]
		},
		'env': {
			'es6': true,
			'browser': true,
			'node': true
		},
		'plugins': ['angular'],
		'extends': 'eslint:recommended'
};
