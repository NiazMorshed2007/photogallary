import changeLoaded from "./loadinganim";
import {combineReducers} from 'redux';
import changeAuth from "./auth";

const rootReducer = combineReducers({
    loaded: changeLoaded,
    isAuth: changeAuth,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
