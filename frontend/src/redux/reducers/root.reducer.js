import { combineReducers } from "redux";

import userReducer from "./user.reducer";

//Combiner tous les reducers en un seul
export default combineReducers({
    user: userReducer,
});