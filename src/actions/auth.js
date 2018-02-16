import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedIn = (token) => ({
	type: USER_LOGGED_IN,
	token
});

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
});

export const login = (credentials) => (dispatch) =>
api.user.login( credentials ).then( data => {
	localStorage.setItem("token", data.token );
	dispatch( userLoggedIn( data ) );
});

export const logout = () => (dispatch) => {
	localStorage.removeItem("token");
	dispatch( userLoggedOut() );
};
