import classes from './App.module.scss';
import { useState } from 'react';

const initResult = 0;
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
	const { value, setValue } = useState({
		value: 0,
		sign: '',
		result: 0,
	});

	return (
		<div className={classes.wrapper}>
			<div className={classes.display}>{value ? value : initResult}</div>
			<div className={classes.buttons}>
				{buttons.map((btn) => (
					<div className={btn === '=' ? classes.equals : null}>{btn}</div>
				))}
			</div>
		</div>
	);
};

export default App;
