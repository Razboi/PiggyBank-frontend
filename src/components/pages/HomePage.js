import React from "react";


class HomePage extends React.Component {
	render() {
		console.log( localStorage.getItem("token") );
		return (
			<div>
				<h1>Home</h1>
			</div>
		);
	}
}

export default HomePage;
