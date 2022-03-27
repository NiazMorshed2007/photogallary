const loadinganim: boolean = false;

const changeLoaded = (state = loadinganim, action: any ):boolean => {
    switch (action.type) {
        case "LOADED" : return true;
        default: return false;
    }
}

export default changeLoaded;