import { SET_IS_SMALL_SCREEN } from '../action'

const initialState = {
  isSmallScreen: false,
}

const resizeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_IS_SMALL_SCREEN:
      return { ...state, isSmallScreen: action.payload }
    default:
      return state
  }
}

export default resizeReducer
