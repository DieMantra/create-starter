import { configureStore } from '@reduxjs/toolkit';

import counterSlice from './counterSlice';

const store = configureStore({
	reducer: {
		counter: counterSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export type AppThunk = ThunkAction<void, RootState, null, Action>;

export default store;
