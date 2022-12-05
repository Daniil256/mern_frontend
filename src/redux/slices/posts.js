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
export const fetchRemovePosts = createAsyncThunk('posts/fetchRemovePosts', async ({ id }) => {
    const { data } = await axios.delete(`/posts/${id}`)
    return data
})
export const fetchCreatePost = createAsyncThunk('posts/fetchCreatePost', async (post) => {
    const { data } = await axios.post(`/posts/`, post)
    return data
})
export const fetchUpdatePost = createAsyncThunk('posts/fetchUpdatePost', async ({ post }) => {
    const { data } = await axios.patch(`/postUpdate/${post._id}`, post)
    return data
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
            state.posts.items[action.meta.arg.index].status = 'Loading'
        },
        [fetchRemovePosts.rejected]: (state, action) => {
            state.posts.message = action.error
            state.posts.items[action.meta.arg.index].status = 'Error'
        },
        [fetchRemovePosts.fulfilled]: (state, action) => {
            state.posts.items[action.meta.arg.index].status = ''
            state.posts.items.splice(action.meta.arg.index, 1)
        },

        [fetchCreatePost.pending]: (state, action) => {
            state.posts.items.push(action.meta.arg)
            state.posts.items[state.posts.items.length - 1].status = 'Loading'
        },
        [fetchCreatePost.rejected]: (state, action) => {
            state.posts.items[state.posts.items.length - 1].status = 'Error'
            localStorage.setItem('data',[state.posts.items.length - 1, JSON.stringify(action.meta.arg)])
        },
        [fetchCreatePost.fulfilled]: (state, action) => {
            state.posts.items[state.posts.items.length - 1] = action.payload.post
            state.posts.items[state.posts.items.length - 1].status = ''
        },

        [fetchUpdatePost.pending]: (state, action) => {
            state.posts.items[action.meta.arg.index].title = action.meta.arg.post.title
            state.posts.items[action.meta.arg.index].text = action.meta.arg.post.text
            state.posts.items[action.meta.arg.index].tags = action.meta.arg.post.tags
            state.posts.items[action.meta.arg.index].imageUrl = action.meta.arg.post.imageUrl
            state.posts.items[action.meta.arg.index].changedAt = action.meta.arg.post.changedAt
            state.posts.items[action.meta.arg.index].status = 'Loading'

        },
        [fetchUpdatePost.rejected]: (state, action) => {
            state.posts.items[action.meta.arg.index].status = 'Error'
            localStorage.setItem(String(action.meta.arg.index),JSON.stringify(action.meta.arg.post))
        },
        [fetchUpdatePost.fulfilled]: (state, action) => {
            state.posts.items[state.posts.items.length - 1].status = ''
        }
    }
})

export const postsReducer = postsSlice.reducer