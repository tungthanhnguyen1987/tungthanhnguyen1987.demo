import { combineReducers } from "redux";
import auth from "./auth";
import controllers from "./controllers";
export default combineReducers({
	auth,
	controllers,
});
