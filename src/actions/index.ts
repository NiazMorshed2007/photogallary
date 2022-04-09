interface IReturn {
    type: string,
}

export const setLoaded = (): IReturn => {
    return {
        type: "LOADED",
    }
};

export const setAuth = (): IReturn => {
    return {
        type: 'AUTHENTICATED'
    }
}

export const setUid = (id: string):string => {
    return id;
}