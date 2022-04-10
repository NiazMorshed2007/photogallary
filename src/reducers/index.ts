import {combineReducers} from 'redux';
import LoggedReducer from './isLogged';
import AlbumsReducer from './user_albums';
import ProfileReducer from './user_profile';

const rootReducer = combineReducers({
    user_profile: ProfileReducer,
    isLogged: LoggedReducer,
    user_albums: AlbumsReducer,
})

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>
