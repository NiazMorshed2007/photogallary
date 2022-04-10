import { IProfile } from "../firebase/IProfile"
import { SET_LOGGED, SET_PROFILE } from "./ActionTypes"


interface IReturn {
    type: string,
}

export const setLogged = (bool: boolean) => {
    return {
        type: SET_LOGGED,
        payload: {
            val: bool,
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