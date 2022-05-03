import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { stepSlice } from './components/flow/flow'
import { flowApi } from '@api/flow-api'

export const store = configureStore({
  reducer: {
    steps: stepSlice.reducer,
    [flowApi.reducerPath]: flowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flowApi.middleware),
});

setupListeners(store.dispatch)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;