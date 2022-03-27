import {createStore, Store} from "redux";
import rootReducer from "./reducers/index";

const store: Store = createStore(rootReducer);

export default store;