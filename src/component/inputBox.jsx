import React, { Component } from "react";
import "../calculator.css";
class InputBox extends Component {
	state = { value: 0 };

	render() {
		return (
			<div>
				<input
					id="input-box"
					type="text"
					placeholder={this.props.value}
					onChange={e => this.props.onChange(e)}
					value={this.props.value}
				/>
				<div id="result">
					<h4>Result: {this.props.result}</h4>
				</div>
			</div>
		);
	}
}

export default InputBox;
