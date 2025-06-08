import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

const redirectPathSlice = createSlice({
    name: 'redirectPath',
    initialState,
    reducers: {
        setRedirectPath: (_state, action: PayloadAction<string>) => action.payload,
        clearRedirectPath: () => '',
    },
});

export const { setRedirectPath, clearRedirectPath } = redirectPathSlice.actions;
export default redirectPathSlice.reducer;
