const initialState = {
  btnS: false
}

export default function btnReducer(state = initialState, action) {

  switch (action.type) {
    case "BTN_PUSH":
      return { ...state, btnS: action.payload }

    default:
      return state;
  }

}