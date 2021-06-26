import initialState, { IState } from "./initialState";
import { AnyAction } from "redux";
import {TEST_ACTION} from "./actions";

const rootReducer = (state: IState = initialState, action: AnyAction) => {
    switch (action.type) {
        case TEST_ACTION:
            console.log("TEST_ACTION");
            return {...state};
        default:
            return state;
    }
};

export default rootReducer;
