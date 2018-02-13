import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "semantic-ui-css/semantic.min.css";
import { userLoggedIn } from "./actions/auth";

const store = createStore(
	rootReducer,
	composeWithDevTools( applyMiddleware( thunk ) )
);

if ( localStorage.token ) {
	const token = { token: localStorage.token };
	store.dispatch( userLoggedIn( token ) );
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);
registerServiceWorker();
