import { GET_GITHUB_REPO_DATA } from "../actions/githublistAction";

const initialState:any = {repoData:[]}

const gitReducer = (state :any= initialState, action:any) => {
  console.log('action.payload :>> ', action.payload);
  switch (action.type) {
    case GET_GITHUB_REPO_DATA:
      return {
        ...state, repoData:[...state.repoData,...action.payload]
      };
    default:
      return state;
  }
};

export default  gitReducer;