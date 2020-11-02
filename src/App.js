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
    // if (!this.state.canCalculate && this.state.operation) {
    //   this.setState((state) => ({
    //     firstOperand: state.secondOperand,
    //     secondOperand: value,
    //     canCalculate: true,
    //   }));
    //   return null;
    // }
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
    this.setState({ secondOperand: value, canCalculate: true });
    // this.setState({ secondOperand: value});
  };

  calculateResult = (operation = this.state.operation) => {
    if (this.state.canCalculate) {
      if (this.state.operation !== operation) {
        this.setState({ canCalculate: false });
      }
      this.setState((state) => ({
        secondOperand: this.handleOperation[state.operation](
          state.firstOperand,
          state.secondOperand
        ),
        operation: operation,
      }));
      if (!this.state.canCalculate) {
        this.setState((state) => ({
          firstOperand: state.secondOperand,
          secondOperand: null,
        }));
      }
      return null;
    }
    this.setState({ operation: operation });
  };

  render() {
    return (
      <div className="app">
        <div className="app-wrapper">
          <div className="app-result">
            {this.state.canCalculate || this.state.secondOperand
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
            onClick={() => {
              if (this.state.canCalculate) {
                this.calculateResult();
              }
            }}
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
