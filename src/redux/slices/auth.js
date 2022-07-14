import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../../axios'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params)
    return data
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params)
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me')
    return data
})

const initialState = {
    data: null,
    status: 'Loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.data = null
            state.status = 'Loading'
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'Loaded'
        },
        [fetchAuth.rejected]: (state, err) => {
            state.data = null
            console.log(err);
            state.status = 'error'
        },

        [fetchAuthMe.pending]: (state) => {
            state.data = null
            state.status = 'Loading'
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'Loaded'
        },
        [fetchAuthMe.rejected]: (state, err) => {
            state.data = null
            console.log(err);
            state.status = 'error'
        },

        [fetchRegister.pending]: (state) => {
            state.data = null
            state.status = 'Loading'
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.data = action.payload
            state.status = 'Loaded'
        },
        [fetchRegister.rejected]: (state, err) => {
            state.data = null
            console.log(err);
            state.status = 'error'
        },
    }
})
export const selectIsAuth = state => Boolean(state.auth.data)
export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer