import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './reducers/homeReducer'
import { useDispatch } from 'react-redux'
export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
})

//Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store

export const useAppDispatch = () => useDispatch<AppDispatch>()
