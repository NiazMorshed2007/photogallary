import {combineReducers} from 'redux';
import LoggedReducer from './isLogged';
import ProfileReducer from './user_profile';

const rootReducer = combineReducers({
    user_profile: ProfileReducer,
    isLogged: LoggedReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
