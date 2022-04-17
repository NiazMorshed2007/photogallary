import { IAlbum } from "../interfaces/IAlbum"
import { IProfile } from "../interfaces/IProfile"
import { SET_ALBUMS, SET_LOADING, SET_LOGGED, SET_PROFILE } from "./ActionTypes"


export const setLogged = (bool: boolean) => {
    return {
        type: SET_LOGGED,
        payload: {
            val: bool,
        }
    }
}


export const setLoading = (bool: boolean) => {
    return {
        type: SET_LOADING,
        payload: {
            val: bool
        }
    }
}


export const setProfile = (obj: IProfile) => {
    return {
        type: SET_PROFILE,
        payload: {
            displayName: obj.displayName,
            email: obj.email,
            photoUrl: obj.photoUrl,
            emailVerified: obj.emailVerified,
            uid: obj.uid,
        }
    }
}

export const setAlbums = (arr: IAlbum[]) => {
    return {
        type: SET_ALBUMS,
        payload: {
            albums: arr,
        }
    }
}