import classes from './App.module.scss';
import React, { useEffect, useState, useReducer } from 'react';

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

const ACTIONS = {
	ADD_DIGIT: 'adding-digit',
	SET_SIGN: 'setting-operation-sign',
	CLEAR: 'clearing-screen',
	EVALUATE: 'evaluate',
};

const reducer = (state, { type, payload }) => {
	switch (type) {
		case ACTIONS.ADD_DIGIT:
			if (state.overwrite)
				return { ...state, currNum: payload, overwrite: false };

			if (payload === '00' && state.currNum == null)
				return { ...state, currNum: '0' };
			if (payload === '0' && state.currNum === '0') return state;
			if (payload === '00' && state.currNum === '0') return state;
			if (payload === '.' && state.currNum && state.currNum.includes('.'))
				return state;
			if (payload === '.' && state.currNum == null)
				return { ...state, currNum: '0.' };

			return {
				...state,
				currNum: `${state.currNum || ''}${payload}`,
			};

		case ACTIONS.SET_SIGN:
			if (state.currNum == null && state.prevNum == null) return state;
			if (state.currNum == null)
				return {
					...state,
					sign: payload,
				};
			if (state.prevNum == null)
				return {
					...state,
					sign: payload,
					prevNum: state.currNum,
					currNum: null,
				};
			return {
				...state,
				prevNum: evaluate(state),
				currNum: null,
				sign: payload,
			};

		case ACTIONS.CLEAR:
			return {};

		case ACTIONS.EVALUATE:
			if (state.prevNum == null || state.currNum == null || state.sign == null)
				return state;
			return {
				...state,
				currNum: evaluate(state),
				prevNum: null,
				sign: null,

				overwrite: true,
			};
	}
};

const evaluate = ({ prevNum, currNum, sign }) => {
	const prev = parseFloat(prevNum);
	const curr = parseFloat(currNum);
	if (isNaN(prev) || isNaN(curr)) return '';
	let result = null;
	switch (sign) {
		case '+':
			result = prev + curr;
			break;
		case '-':
			result = prev - curr;
			break;
		case '/':
			if (curr === 0) result = 'ERR';
			else result = prev / curr;
			break;
		case '*':
			result = prev * curr;
			break;
		case '^':
			result = Math.pow(prev, curr);
			break;
	}
	return result.toString();
};

const App = () => {
	const [{ prevNum, currNum, sign }, dispatch] = useReducer(reducer, {});
	const [keyError, setKeyError] = useState('Try to use the keyboard.');

	useEffect(() => {
		window.addEventListener('keydown', keyboardEvents);
	}, []);

	const inputHandler = (e, type, payload) => {
		e.preventDefault();
		let key = payload || e.key;
		dispatch({ type: type, payload: key });
		setKeyError('');
	};

	const keyboardEvents = (e) => {
		e.key === '=' || e.key === 'Enter'
			? inputHandler(e, ACTIONS.EVALUATE)
			: e.key === 'C' || e.key === 'c'
			? inputHandler(e, ACTIONS.CLEAR)
			: ['+', '-', '/', '*', '^'].includes(e.key)
			? inputHandler(e, ACTIONS.SET_SIGN)
			: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(e.key)
			? inputHandler(e, ACTIONS.ADD_DIGIT)
			: e.key === 'Shift'
			? setKeyError('')
			: setKeyError('This key is not allowed.');
	};

	return (
		<div className={classes.wrapper}>
			<div className={classes.display}>
				<div className={classes.previousNumber}>{prevNum}</div>
				<div className={classes.sign}>{sign}</div>
				<div className={classes.currentNumber}>{currNum}</div>
			</div>
			<div className={classes.buttons}>
				{buttons.map((btn, i) => (
					<button
						key={i}
						className={btn === '=' ? classes.equals : null}
						onClick={
							btn === '='
								? () => dispatch({ type: ACTIONS.EVALUATE })
								: btn === 'C'
								? () => dispatch({ type: ACTIONS.CLEAR })
								: ['+', '-', '/', '*', '^'].includes(btn)
								? () => dispatch({ type: ACTIONS.SET_SIGN, payload: btn })
								: () => dispatch({ type: ACTIONS.ADD_DIGIT, payload: btn })
						}
					>
						{btn}
					</button>
				))}
			</div>
			<p className={classes.error}>{keyError}</p>
		</div>
	);
};

export default App;
