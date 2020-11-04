import React from "react";
import "./App.css";
import { ReactComponent as Backspace } from "./backspace.svg";
import { ReactComponent as Multiply } from "./multiply.svg";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.initialState;
  }

  handleOperation = {
    "+": (x, y) => Math.round((x + y) * 1000) / 1000,
    "-": (x, y) => Math.round((x - y) * 1000) / 1000,
    "/": (x, y) => Math.round((x / y) * 1000) / 1000,
    "*": (x, y) => Math.round(x * y * 1000) / 1000,
  };

  handleSelector = (operation) => {
    return operation === this.state.operation &&
      this.state.firstOperand !== "ERR"
      ? "app-cell--active"
      : "";
  };

  handleClick = (value) => {
    if (this.state.firstOperand === "ERR") {
      return null;
    }

    if (this.state.operation === "=") {
      this.setState({ firstOperand: parseFloat(value), operation: null });
      return null;
    }

    if (this.state.operation) {
      if (this.state.secondOperand !== null) {
        if (this.state.secondOperand.toString().length === 8) {
          return null;
        }

        if (this.state.isFloat) {
          this.setState((state) => ({
            secondOperand: parseFloat(
              state.secondOperand.toString() + "." + value.toString()
            ),
            isFloat: false,
          }));
          return null;
        }

        this.setState((state) => ({
          secondOperand: parseFloat(
            state.secondOperand.toString() + value.toString()
          ),
        }));
        return null;
      }

      this.setState({ secondOperand: parseFloat(value) });
      return null;
    }

    if (this.state.firstOperand.toString().length === 8) {
      return null;
    }

    if (this.state.isFloat) {
      this.setState((state) => ({
        firstOperand: parseFloat(
          state.firstOperand.toString() + "." + value.toString()
        ),
        isFloat: false,
      }));
      return null;
    }

    if (this.state.firstOperand !== 0) {
      this.setState((state) => ({
        firstOperand: parseFloat(
          state.firstOperand.toString() + value.toString()
        ),
      }));
      return null;
    }

    this.setState({ firstOperand: parseFloat(value), operation: null });
  };

  calculateResult = (operation) => {
    if (this.state.secondOperand) {
      let result = this.handleOperation[this.state.operation](
        this.state.firstOperand,
        this.state.secondOperand
      );

      if (result.toString().length > 8) {
        result = "ERR";
      }

      this.setState({
        firstOperand: result,
        secondOperand: null,
      });
    }

    this.setState({ operation: operation, isFloat: false });
  };

  render() {
    const result = () => {
      if (!this.state.isFloat) {
        return this.state.secondOperand !== null
          ? this.state.secondOperand
          : this.state.firstOperand;
      }
      return this.state.secondOperand !== null
        ? `${this.state.secondOperand}.`
        : `${this.state.firstOperand}.`;
    };
    return (
      <div className="app">
        <div className="app-wrapper">
          <div className="app-result">{result()}</div>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              if (this.state.secondOperand !== null) {
                this.setState({ secondOperand: null, isFloat: false });
                return null;
              }
              if (this.state.operation && this.state.operation !== "=") {
                this.setState({ operation: null, secondOperand: null });
                return null;
              }
              this.setState({
                firstOperand: 0,
                operation: null,
                isFloat: false,
              });
            }}
          >
            C
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.setState(this.props.initialState);
            }}
          >
            AC
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              if (
                this.state.operation &&
                this.state.operation !== "=" &&
                this.state.secondOperand === null
              ) {
                return null;
              }

              if (this.state.isFloat) {
                this.setState({ isFloat: false });
                return null;
              }

              const deleteDigit = (key, number) => {
                const numberString = number.toString();
                if (numberString[numberString.length - 2] === ".") {
                  this.setState({ isFloat: true });
                }

                let value = null;
                if (numberString.length === 1) {
                  value = 0;
                }
                if (value === null) {
                  value = parseFloat(
                    numberString.slice(0, numberString.length - 1)
                  );
                }
                this.setState({
                  [`${key}`]: value,
                });
              };

              if (this.state.secondOperand !== null) {
                deleteDigit(`secondOperand`, this.state.secondOperand);
                return null;
              }

              if (this.state.firstOperand) {
                deleteDigit(`firstOperand`, this.state.firstOperand);
              }
            }}
          >
            <Backspace />
          </button>
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              this.calculateResult("=");
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
            className={`app-cell ${this.handleSelector("*")}`}
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
            className={`app-cell ${this.handleSelector("/")}`}
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
            className={`app-cell ${this.handleSelector("-")}`}
            onClick={() => {
              this.calculateResult("-");
            }}
          >
            -
          </button>
          <button
            type="button"
            className="app-cell app-cell--vertical"
            onClick={() => {
              if (
                this.state.operation &&
                this.state.operation !== "=" &&
                this.state.secondOperand === null
              ) {
                return null;
              }

              if (this.state.secondOperand !== null) {
                this.setState((state) => ({
                  secondOperand: state.secondOperand * -1,
                }));
                return null;
              }

              this.setState((state) => ({
                firstOperand: state.firstOperand * -1,
              }));
            }}
          >
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
          <button
            type="button"
            className="app-cell"
            onClick={() => {
              if (this.state.isFloat) {
                return null;
              }
              if (
                this.state.operation &&
                this.state.operation !== "=" &&
                this.state.secondOperand === null
              ) {
                return null;
              }
              if (this.state.secondOperand !== null) {
                if (this.state.secondOperand.toString().search(".") !== -1) {
                  this.setState({ isFloat: true });
                }
                return null;
              }
              if (this.state.firstOperand.toString().search(".") !== -1) {
                this.setState({ isFloat: true });
              }
            }}
          >
            .
          </button>
          <button
            type="button"
            className={`app-cell ${this.handleSelector("+")}`}
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
