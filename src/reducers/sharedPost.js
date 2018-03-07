
const sharedPostReducerDefaultState = {
  isLoading : "not started",
};

export default (state = sharedPostReducerDefaultState, action) => {
  switch (action.type) {
    case 'VIEW_POST':
      return {
        ...state,
        isLoading: "finished",
        ...action.post
      };
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: "loading"
      }
    default:
      return state;
  }
};
