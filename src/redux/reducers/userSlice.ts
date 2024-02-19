import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserState = {
  userId: string | null
  roleId: string | null
  email: string | null
  fullName: string | null
}
const initialState: UserState = {
  userId: null,
  roleId: null,
  email: null,
  fullName: null,
}

const userSlice = createSlice({
  name: `user`,
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      ;(state.userId = action.payload.userId),
        (state.roleId = action.payload.roleId)
      state.email = action.payload.email
      state.fullName = action.payload.fullName
    },
    resetUser(state) {
      ;(state.userId = null), (state.roleId = null)
      state.email = null
      state.fullName = null
    },
  },
})
export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
