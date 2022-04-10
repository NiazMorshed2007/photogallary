import { SET_PROFILE } from "../actions/ActionTypes"
import { IProfile } from "../firebase/IProfile";

const profile: IProfile = {
    displayName: '',
    email: '',
    photoUrl: '',
    emailVerified: false,
    uid: '',
}

const ProfileReducer = (state = profile, action: any) => {
    switch(action.type) {
        case SET_PROFILE: {
            return {
                displayName: action.payload.displayName,
                email: action.payload.email,
                photoUrl: action.payload.photoUrl,
                emailVerified: action.payload.emailVerified,
                uid: action.payload.uid,
            }
        };
        default: return state;
    }
}

export default ProfileReducer;