import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import homeReducer from './reducers/homeReducer'
import locationReducer from './reducers/locationReducer'
import resizeReducer from './reducers/resizeSlice'
import { locationAPISlice } from './reducers/locationSlice'
import userSlice from './reducers/userSlice'
import sessionSlice from './reducers/sessionSlice'

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['user', 'session'],
}

const rootReducer = combineReducers({
  home: homeReducer,
  resize: resizeReducer,
  location: locationReducer,
  user: userSlice,
  session: sessionSlice,
  [locationAPISlice.reducerPath]: locationAPISlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
          'persist/REGISTER',
        ],
      },
    }).concat(locationAPISlice.middleware),
})

export const persistor = persistStore(store)

//Lấy RootState và AppDispatch từ store của chúng ta
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default { store, persistor }