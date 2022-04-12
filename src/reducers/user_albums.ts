import { SET_ALBUMS } from "../actions/ActionTypes";
import { IAlbum } from "../interfaces/IAlbum";

const albums: IAlbum[] = [];

const AlbumsReducer = (state = albums, action: any) => {
    switch(action.type) {
        case SET_ALBUMS: {
            return action.payload.albums;
        };
        default: return state;
    }
}

export default AlbumsReducer;