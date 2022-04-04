const isAuth: boolean = false;

const changeAuth = (state = isAuth, action: any ):boolean => {
    switch (action.type) {
        case "AUTHENTICATED" : return true;
        default: return false;
    }
}

export default changeAuth;