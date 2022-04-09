import { IProfile } from "../firebase/IProfile"
import { SET_PROFILE } from "./ActionTypes"


interface IReturn {
    type: string,
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