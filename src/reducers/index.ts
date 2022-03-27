import changeLoaded from "./loadinganim";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    loaded: changeLoaded,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
