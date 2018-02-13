import axios from "axios";

export default {
	user: {
		login: credentials =>
		axios.post("/api/users/token-auth", credentials ).then( res => res.data )
	}
};
