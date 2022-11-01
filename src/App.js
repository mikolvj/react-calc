import classes from './App.module.scss';
import React, { useState, useReducer } from 'react';

const buttons = [
	'C',
	'^',
	'*',
	'/',
	7,
	8,
	9,
	'-',
	4,
	5,
	6,
	'+',
	'1',
	'2',
	'3',
	'=',
	'0',
	'00',
	'.',
];

const App = () => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.display}>
				<div className={classes.previousNumber}>123</div>
				<div className={classes.sign}>+</div>
				<div className={classes.currentNumber}>456</div>
			</div>
			<div className={classes.buttons}>
				{buttons.map((btn, i) => (
					<div key={i} className={btn === '=' ? classes.equals : null}>
						{btn}
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
