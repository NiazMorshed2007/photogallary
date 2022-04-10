import { SET_ALBUMS } from "../actions/ActionTypes";

const albums: [] = [];

const AlbumsReducer = (state = albums, action: any) => {
    switch(action.type) {
        case SET_ALBUMS: {
            return action.payload.albums;
        };
        default: return state;
    }
}

export default AlbumsReducer;