import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

class Button extends Component {
	render() {
		return this.renderButton();
	}

	renderButton() {
		if (this.props.value === "=") {
			return (
				<button className="badge badge-lg m-1" onClick={this.props.onClick}>
					{this.props.value}
				</button>
			);
		} else {
			return (
				<button
					className="badge badge-md m-1"
					onClick={() => this.props.onClick(this.props.value)}
				>
					{this.props.value}
				</button>
			);
		}
	}
}

export default Button;
