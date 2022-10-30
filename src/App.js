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
	const [value, setValue] = useState('');

	const handleClear = () => {
		setValue('');
	};

	const handleEquals = () => {
		console.log('equals');
	};
	const handleSign = (e) => {
		console.log(e.target.innerHTML);
	};
	const handleNum = (e) => {
		console.log(e.target.innerHTML);
		console.log(value);
		if (value.length < 9) {
			if (e.target.innerHTML === '.' && value === '') setValue('0.');
			else if (e.target.innerHTML === '.' && value.includes('.')) return;
			else setValue(value + e.target.innerHTML);
		} else return;
	};
	return (
		<div className={classes.wrapper}>
			<div className={classes.display}>{value ? value : initResult}</div>
			<div className={classes.buttons}>
				{buttons.map((btn, i) => (
					<div
						key={i}
						className={btn === '=' ? classes.equals : null}
						value={btn}
						onClick={
							btn === '='
								? handleEquals
								: btn === '+' ||
								  btn === '-' ||
								  (btn === '/') | (btn === '*') ||
								  btn === '^'
								? handleSign
								: btn === 'C'
								? handleClear
								: handleNum
						}
					>
						{btn}
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
