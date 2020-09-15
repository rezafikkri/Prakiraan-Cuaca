import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
	input: 'src/js/cuaca.js',
	output: [{
		file: 'dist/js/cuaca.js',
		format: 'iife',
		banner: `/*!
 * CV Reza v2
 * Copyright (c) 2020 Reza Sariful Fikri
*/`,
	}, {
		file: 'dist/js/cuaca.min.js',
		format: 'iife',
		banner: `/*!
 * CV Reza v2
 * Copyright (c) 2020 Reza Sariful Fikri
*/`,
		plugins: [terser()]
	}],
	plugins: [
		resolve(),
		babel({ 
			babelHelpers: "bundled"
		})
	]
}