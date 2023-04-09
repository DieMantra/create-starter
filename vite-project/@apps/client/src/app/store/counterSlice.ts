import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface CounterState {
	value: number;
	isEvenNumber: boolean;
}

// Define the initial state using that type
const initialState: CounterState = {
	value: 0,
	isEvenNumber: true,
};

const checkIfEvenNumber = (value: number): boolean => {
	return value % 2 === 0;
};

export const counterSlice = createSlice({
	name: 'counter',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		increment: (state): void => {
			state.value += 1;
			state.isEvenNumber = checkIfEvenNumber(state.value);
		},
		decrement: (state): void => {
			state.value -= 1;
			state.isEvenNumber = checkIfEvenNumber(state.value);
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		incrementByAmount: (state, action: PayloadAction<number>): void => {
			state.value += action.payload;
			state.isEvenNumber = checkIfEvenNumber(state.value);
		},
		reset: (state): void => {
			state.value = 0;
			state.isEvenNumber = checkIfEvenNumber(state.value);
		},
	},
});

// Exporting the counter actions that are imported and called on the frontend to trigger the reducers
export const { increment, decrement, incrementByAmount, reset } =
	counterSlice.actions;

// Exporting the reducer functions from the newly created slice
// Allowing it to be imported by the redux-store and added to the reducers.
export default counterSlice.reducer;
