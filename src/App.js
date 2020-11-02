import React from "react";
import "./App.css";
import { ReactComponent as Backspace } from "./backspace.svg";
import { ReactComponent as Multiply } from "./multiply.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstOperand: 0,
      secondOperand: null,
      operation: null,
    };
  }

  handleOperation = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "/": (x, y) => x / y,
    "*": (x, y) => x * y,
  };

  handleClick = (value) => {
    if (this.state.operation) {
      if (this.state.secondOperand !== null) {
        if (this.state.secondOperand.toString().length === 8) {
          return null;
        }

        this.setState((state) => ({
          secondOperand: Number.parseInt(
            state.secondOperand.toString() + value.toString()
          ),
        }));
        return null;
      }

      this.setState({ secondOperand: Number.parseInt(value) });
      return null;
    }

    if (this.state.firstOperand !== 0) {
      if (this.state.firstOperand.toString().length === 8) {
        return null;
      }

      this.setState((state) => ({
        firstOperand: Number.parseInt(
          state.firstOperand.toString() + value.toString()
        ),
      }));
      return null;
    }

    this.setState({ firstOperand: Number.parseInt(value) });
  };

  calculateResult = (operation = this.state.operation, hidden) => {
    if (this.state.secondOperand) {
      this.setState((state) => ({
        firstOperand: this.handleOperation[state.operation](
          Number.parseInt(state.firstOperand),
          Number.parseInt(state.secondOperand)
        ),
        secondOperand: null,
      }));
    }
    this.setState({ operation: operation });
  };

  render() {
    return (
      <div className="app">
        <div className="app-wrapper">
          <div className="app-result">
            {this.state.secondOperand
              ? this.state.secondOperand
              : this.state.firstOperand}
          </div>
          <button type="button" className="app-cell">
            C
          </button>
          <button type="button" className="app-cell">
            AC
          </button>
          <button type="button" className="app-cell">
            <Backspace />
          </button>
          <button
            type="button"
            className="app-cell"
            // onClick={() => {
            //   if (this.state.canCalculate) {
            //     this.calculateResult();
            //   }
            // }}
          >
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
              this.calculateResult("*");
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
              this.calculateResult("/");
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
              this.calculateResult("-");
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
              this.calculateResult("+");
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
