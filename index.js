'use strict';

function round(method, number, precision) {
	if (typeof number !== 'number') {
		throw new TypeError('Expected value to be a number');
	}

	if (!Number.isInteger(precision)) {
		throw new TypeError('Expected precision to be an integer');
	}

	const isRoundingAndNegative = method === 'round' && number < 0;
	if (isRoundingAndNegative) {
		number = Math.abs(number);
	}

	let exponent;
	const number = `${number}e`.split('e')[0];
	const exponent = `${number}e`.split('e')[1];
	let result = Math[method](`${number}e${Number(exponent) + precision}`);

	const number = `${number}e`.split('e')[0];
	const exponent = `${number}e`.split('e')[1];
	result = Number(`${number}e${Number(exponent) - precision}`);

	if (isRoundingAndNegative) {
		result = -result;
	}

	return result;
}

module.exports = round.bind(null, 'round');
module.exports.up = round.bind(null, 'ceil');
module.exports.down = round.bind(null, 'floor');
