import React from "react";
import "./App.css";
import { ReactComponent as Backspace } from "./backspace.svg";
import { ReactComponent as Multiply } from "./multiply.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOperand: 0,
      secondOperand: 0,
      operation: null,
      canCalculate: false,
    };
  }

  handleOperation = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "/": (x, y) => x / y,
    "*": (x, y) => x * y,
  };

  handleClick = (value) => {
    if (!this.state.canCalculate && this.state.operation) {
      this.setState((state) => ({
        firstOperand: state.secondOperand,
        secondOperand: value,
        canCalculate: true,
      }));
      return null;
    }
    if (this.state.secondOperand) {
      if (this.state.secondOperand.toString().length === 8) {
        return null;
      }
      this.setState((state) => {
        this.setState({
          secondOperand: Number(
            state.secondOperand.toString() + value.toString()
          ),
        });
        return null;
      });
    }
    this.setState({ secondOperand: value });
  };

  calculateResult = (operation) => {
    if (this.state.operation) {
      this.setState((state) => ({
        firstOperand: this.handleOperation[state.operation](
          state.firstOperand,
          state.secondOperand
        ),
        // operation: null,
      }));
      return null;
    }
    this.setState({
      // firstOperand: value,
      operation: operation,
    });
  };

  render() {
    return (
      <div className="app">
        <div className="app-wrapper">
          <div className="app-result">{this.state.secondOperand}</div>
          <button type="button" className="app-cell">
            C
          </button>
          <button type="button" className="app-cell">
            AC
          </button>
          <button type="button" className="app-cell">
            <Backspace />
          </button>
          <button type="button" className="app-cell">
            =
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(3);
            }}
          >
            3
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(6);
            }}
          >
            6
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(9);
            }}
          >
            9
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.setState({ operation: "*" });
            }}
          >
            <Multiply />
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(2);
            }}
          >
            2
          </button>
          <button
            type="button"
            className="app-cell"
            value="5"
            onClick={() => {
              this.handleClick(5);
            }}
          >
            5
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(8);
            }}
          >
            8
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.setState({ operation: "/" });
            }}
          >
            /
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(1);
            }}
          >
            1
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(4);
            }}
          >
            4
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(7);
            }}
          >
            7
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.setState({ operation: "-" });
            }}
          >
            -
          </button>
          <button type="button" className="app-cell app-cell--vertical">
            +<br />-
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.handleClick(0);
            }}
          >
            0
          </button>
          <button type="button" className="app-cell">
            .
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.setState({ operation: "+" });
            }}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

export default App;
