import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

//get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

//initial state pertaining to our user state/ auth
const initialState = {
	//if there is a user in local storage we use that or else we return null
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

//asyncThunk function is basically a function which deal with async data (our backend)
//Register the user
//the user is actually gonna pass from register page, we are going to dispatch the function from there and pass in the user data
export const register = createAsyncThunk(
	'auth/register',
	async (user, thunkAPI) => {
		try {
			//here is where we are gonna make our request
			return await authService.register(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		//here is where we are gonna make our request
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

//create the actual slice
export const authSlice = createSlice({
	name: 'auth',
	initialState,
	//regular reducer fn to reset the state to the default values
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	//the async reducer fns will be here
	// extra reducer functions for the register
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
