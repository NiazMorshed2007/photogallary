import {combineReducers} from 'redux';
import ProfileReducer from './user_profile';

const rootReducer = combineReducers({
    user_profile: ProfileReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
