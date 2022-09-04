import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from '../../utils/axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts')
    return data
})
export const fetchPopulatePosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/populatePosts')
    return data
})
export const fetchPostsSortByTag = createAsyncThunk('posts/fetchPosts', async (tagName) => {
    const { data } = await axios.get(`/postsSortByTag/${tagName}`)
    return data
})
export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags')
    return data
})
export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async (id) =>
    await axios.delete(`/posts/${id}`)
)
export const fetchCreatePost = createAsyncThunk('posts/fetchCreatePost', async (post) => {
    await axios.post(`/posts/`, post).then(async () => {

        const { data } = await axios.get('/posts')
        return data
    })
})

const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = []
            state.posts.status = 'Loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload
            state.posts.status = 'Loaded'
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts.items = []
            state.posts.status = 'Loaded'
            state.posts.message = action.error
        },

        [fetchTags.pending]: (state) => {
            state.tags.items = []
            state.tags.status = 'Loading'
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload
            state.tags.status = 'Loaded'
        },
        [fetchTags.rejected]: (state, action) => {
            state.tags.items = []
            state.tags.status = 'Loaded'
            state.tags.message = action.error
        },

        [fetchRemovePosts.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
        [fetchCreatePost.pending]: (state, action) => {
            state.posts.items.push(action.meta.arg)
        },
    }
})

export const postsReducer = postsSlice.reducer