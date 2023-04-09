import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../app/store/redux-store';

// Creating a custom hook useAppDispatch which returns the AppDispatch type by calling useDispatch hook
// AppDispatch is the Type from the redux store dispatch.
// Creating out own custom useDispatcher here allows us to use the dispatcher in our code
// Retaining the dispatch typesafety.
export const useAppDispatch: () => AppDispatch = useDispatch;

// Creating a custom hook useAppSelector which takes RootState type as generic parameter and returns TypedUseSelectorHook hook.
// This hook can be used to select specific parts of the state object in a strongly-typed manner.
// The state object is defined by RootState type imported above.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
