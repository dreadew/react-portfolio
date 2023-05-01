import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    title: null,
    desc: null,
    imgUrl: null,
    client: null,
    task: null,
    role: null,
    overview: null,
}

const workSlice = createSlice({
    name: 'work',
    initialState,
    reducers: {
        setWork(state, action) {
            state.id = action.payload.id
            state.title = action.payload.title
            state.desc = action.payload.desc
            state.imgUrl = action.payload.imgUrl
            state.client = action.payload.client
            state.task = action.payload.task
            state.overview = action.payload.overview
            state.role = action.payload.role
        },
        removeWork(state) {
            state.id = null
            state.title = null
            state.desc = null
            state.imgUrl = null
            state.client = null
            state.task = null
            state.overview = null
            state.role = null
        }
    },
})

export const {setWork, removeWork} = workSlice.actions

export default workSlice.reducer