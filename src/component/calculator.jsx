//check for a valid expression
//handle decimal numbers
import React, { Component } from "react";
import "../calculator.css";
import InputBox from "./inputBox";
import Button from "./button";

class Calculator extends Component {
	state = {
		expression: 0,
		result: ""
	};

	constructor() {
		super();

		this.numbers = [];
		this.operators = [];
		this.validExpression = true;
	}
	render() {
		return (
			<div className="container-fluid">
				<div id="calculator-container">
					<h2 id="title">Simple Calculator App</h2>
					<InputBox
						value={this.state.expression}
						onChange={this.handleChange}
						result={this.state.result}
					/>
					<div id="buttons-container">
						<Button value={0} onClick={this.handleInput} />
						<Button value={1} onClick={this.handleInput} />
						<Button value={2} onClick={this.handleInput} />
						<Button value={3} onClick={this.handleInput} />
						<Button value={4} onClick={this.handleInput} />
						<Button value={5} onClick={this.handleInput} />
						<Button value={6} onClick={this.handleInput} />
						<Button value={7} onClick={this.handleInput} />
						<Button value={8} onClick={this.handleInput} />
						<Button value={9} onClick={this.handleInput} />
						<div id="function-buttons-container">
							<Button value="+" onClick={this.handleInput} />
							<Button value="-" onClick={this.handleInput} />
							<Button value="/" onClick={this.handleInput} />
							<Button value="*" onClick={this.handleInput} />
							<Button value="^" onClick={this.handleInput} />
							<Button value="C" onClick={this.handleReset} />
							<Button value="=" onClick={this.handleCalculation} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	handleReset = () => {
		this.setState({ expression: 0 });
	};

	handleInput = b => {
		this.setState({ expression: this.state.expression + b.toString() });
	};

	handleCalculation = () => {
		//reset numbers and operators array
		this.numbers = [];
		this.operators = [];
		let tempNum = "";
		let numCount = 0;
		let currentChar = 0;
		let finalResult = 0.0;

		//break string into numbers and operators
		//loop t
		for (let num of this.state.expression) {
			//if a number, add to the tempNum str to be converted to a number later
			if (!isNaN(num)) {
				tempNum += num;
				currentChar++;
				//if at last num is not a number
				if (currentChar === this.state.expression.length) {
					console.log("at last");
					this.numbers[numCount] = parseFloat(tempNum);
				}
				//if not a num, check for dots, invalid expression e.g. characters (str.match(regexp) & double operators)
			} else {
				switch (num) {
					case "^":
					case "*":
					case "/":
					case "+":
					case "-":
						//if two operators side by side
						if (
							num.match(/\^|\*|\\|\+|-/) &&
							this.state.expression.charAt(currentChar + 1).match(/\^|\*|\\|\+|-/)
						) {
							this.validExpression = false;
							this.setState({ result: "Invalid Expression" });
							break;
						} else if (
							this.state.expression.indexOf(num) ===
							this.state.expression.length - 1
						) {
							//if last char is an operator
							this.validExpression = false;
							this.setState({ result: "Invalid Expression" });
							break;
						} else {
							//if normal operators
							this.numbers[numCount] = parseFloat(tempNum);
							this.operators[numCount] = num;
							tempNum = "";
							numCount++;
							currentChar++;
						}
						break;
					case ".":
						//if decimal
						tempNum += num;
						currentChar++;
						break;
					default:
						this.validExpression = false;
						this.setState({ result: "Invalid Expression" });
						break;
				}
				//if normal operators
			}
		}

		while (this.operators.length > 0) {
			console.log("final result ", finalResult);
			console.log(this.numbers, this.operators);
			if (this.operators.includes("^")) {
				let index = this.operators.findIndex(element => {
					return element === "^";
				});
				finalResult = Math.pow(this.numbers[index], this.numbers[index + 1]);
				this.numbers.splice(index, 2, finalResult);
				this.operators.splice(index, 1);
				continue;
			} else if (this.operators.includes("*")) {
				let index = this.operators.findIndex(element => {
					return element === "*";
				});
				finalResult = this.numbers[index] * this.numbers[index + 1];
				this.numbers.splice(index, 2, finalResult);
				this.operators.splice(index, 1);
				continue;
			} else if (this.operators.includes("/")) {
				let index = this.operators.findIndex(element => {
					return element === "/";
				});
				finalResult = this.numbers[index] / this.numbers[index + 1];
				this.numbers.splice(index, 2, finalResult);
				this.operators.splice(index, 1);
				continue;
			} else if (this.operators.includes("+")) {
				let index = this.operators.findIndex(element => {
					return element === "+";
				});
				finalResult = this.numbers[index] + this.numbers[index + 1];
				this.numbers.splice(index, 2, finalResult);
				this.operators.splice(index, 1);
				continue;
			} else if (this.operators.includes("-")) {
				let index = this.operators.findIndex(element => {
					return element === "-";
				});
				finalResult = this.numbers[index] - this.numbers[index + 1];
				this.numbers.splice(index, 2, finalResult);
				this.operators.splice(index, 1);
				continue;
			}
		}

		if (isNaN(finalResult)) {
			this.setState({ result: "Invalid expression" });
		} else {
			this.setState({ result: finalResult });
		}
		console.log(parseFloat(finalResult), this.state.result);
	};

	handleChange = e => {
		e.preventDefault();

		this.setState({ expression: e.target.value });
	};
}

export default Calculator;
