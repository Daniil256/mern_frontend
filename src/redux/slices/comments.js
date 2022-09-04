import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../utils/axios'

export const fetchAllComments = createAsyncThunk('comments/fetchAllComments', async () => {
    const { data } = await axios.get('/comments')
    return data
})

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'loading'
    },
    reducers: {},
    extraReducers: {
        [fetchAllComments.pending]: (state) => {
            state.comments = []
            state.status = 'Loading'
        },
        [fetchAllComments.fulfilled]: (state, action) => {
            state.comments = action.payload
            state.status = 'Loaded'
        },
        [fetchAllComments.rejected]: (state, action) => {
            state.comments = []
            state.status = 'Loaded'
            state.message = action.error
        },
    }
})
export const commentsReducer = commentSlice.reducer
