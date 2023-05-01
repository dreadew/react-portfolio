import { configureStore } from "@reduxjs/toolkit"
import workReducer from './slices/workSlice'

export const store = configureStore({
    reducer: {
        work: workReducer
    }
})