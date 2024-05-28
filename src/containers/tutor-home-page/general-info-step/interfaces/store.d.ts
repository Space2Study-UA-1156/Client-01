import { store } from '~/redux/store'

declare module '@reduxjs/toolkit' {
  interface DefaultRootState {
    appMain: {
      userId: string
      userRole: string
    }
  }
}
export type RootState = ReturnType<typeof store.getState>
