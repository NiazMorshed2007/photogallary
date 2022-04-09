const uid: string = '';

const changeUid = (state = uid, action: any) => {
    state = action.payload;
}

export default changeUid;