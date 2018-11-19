/*
function truncate(string, length) {
	if (string.length > length) {
	return string.slice(0, length) + '...';
	} else {
	return string;
	}
}

function camelCase(string) {
	const words = string.split(/[\s|\-|_]+/);
	return [
	words[0].toLowerCase(),
	...words.slice(1).map((w) => capitalize(w)),
	].join('');
}

function capitalize(string) {
	return (
	string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
	);
}



describe('test boolean param', () => {
	it('`true` toBe `true`', () => {
		expect(true).toBe(true);
	});
	it('`false` toBe `false`', () => {
		expect(false).toBe(false);
	});
});


describe('camelCase()', () => {
	it('camelizes string with spaces', () => {
		const string = 'customer responded at';
		expect(
			camelCase(string)
	).toEqual('customerRespondedAt');
	});
		it('camelizes string with underscores', () => {
		const string = 'customer_responded_at';
		expect(
			camelCase(string)
	).toEqual('customerRespondedAt');
	});
});

describe('tuncate()', () => {
	describe('`truncate()`', () => {

		const string = 'there was one catch, and that was CATCH-22';

		it('truncates a string', () => {
			expect(
				truncate(string, 19)
		).toEqual('there was one catch...');
		});

		it('no-ops if <= length', () => {
			expect(
				truncate(string, string.length)
			).toEqual(string);
			});
		});
});
*/

/*
import React from 'react';
import Enzyme,{ shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import HomePage from '../components/pages/HomePage'


describe('App', () => {
	

	it('should have the `h1` "HomePage"', () => {

		const wrapper = shallow(
			<HomePage />
		);
	});

	expect(
		wrapper.contains(<h1>HomePage</h1>)
	).toBe(true);

});
*/