import { SET_LOADING } from "../actions/ActionTypes";

const isLoading: boolean = true;

const LoadingReducer = ((state = isLoading, action: any) => {
    switch(action.type) {
        case SET_LOADING: {
            return action.payload.val;
        }; default : return state;
    }
})

export default LoadingReducer;