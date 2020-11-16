import React, { useState, useEffect } from "react";
import "./App.css";
import { ReactComponent as Backspace } from "./backspace.svg";
import { ReactComponent as Multiply } from "./multiply.svg";

const App = () => {
  const [operand1, setOperand1] = useState(0);
  const [operand2, setOperand2] = useState(null);
  const [operation, setOperation] = useState(null);
  const [isFloat, setIsFloat] = useState(false);
  const [onScreen, setOnScreen] = useState(0);

  useEffect(() => {
    if (operand2 !== null) {
      setOnScreen(operand2);
    } else {
      setOnScreen(operand1);
    }

  }, [operand1, operand2]);

  const handleOperation = {
    "+": (x, y) => Math.round((x + y) * 1000) / 1000,
    "-": (x, y) => Math.round((x - y) * 1000) / 1000,
    "/": (x, y) => Math.round((x / y) * 1000) / 1000,
    "*": (x, y) => Math.round(x * y * 1000) / 1000,
  };

  const handleSelector = (type) => {
    return type === operation && operand1 !== "ERR" ? "app-cell--active" : "";
  };

  const handleClick = (value) => {
    if (operand1 === "ERR") {
      return null;
    }

    if (operation === "=") {
      setOperand1(parseFloat(value));
      setOperation(null);
      return null;
    }

    if (operation) {
      if (operand2 !== null) {
        if (operand2.toString().length === 8) {
          return null;
        }

        if (isFloat) {
          setOperand2(parseFloat(operand2.toString() + "." + value.toString()));
          setIsFloat(false);
          return null;
        }

        setOperand2(parseFloat(operand2.toString() + value.toString()));
        return null;
      }

      setOperand2(parseFloat(value));
      return null;
    }

    if (operand1.toString().length === 8) {
      return null;
    }

    if (isFloat) {
      setOperand1(parseFloat(operand1.toString() + "." + value.toString()));
      setIsFloat(false);
      return null;
    }

    if (operand1 !== 0) {
      setOperand1(parseFloat(operand1.toString() + value.toString()));
      return null;
    }

    setOperand1(parseFloat(value));
    setOperation(null);
  };

  const calculateResult = (type) => {
    if (operand2) {
      let result = handleOperation[operation](operand1, operand2);

      if (result.toString().length > 8) {
        result = "ERR";
      }

      setOperand1(result);
      setOperand2(null);
    }

    setOperation(type);
    setIsFloat(false);
  };

  return (
    <div className="app">
      <div className="app-wrapper">
        <div className="app-result">{onScreen}</div>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            if (operand2 !== null) {
              setOperand2(null);
              setIsFloat(false);
              return null;
            }
            if (operation && operation !== "=") {
              setOperation(null);
              setOperand2(null);
              return null;
            }
            setOperand1(0);
            setOperation(null);
            setIsFloat(false);
          }}
        >
          C
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            setOperand1(0);
            setOperand2(null);
            setOperation(null);
            setIsFloat(false);
          }}
        >
          AC
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            if (operation && operation !== "=" && operand2 === null) {
              return null;
            }

            if (isFloat) {
              setIsFloat(false);
              return null;
            }

            const deleteDigit = (setNumber, number) => {
              const numberString = number.toString();
              if (numberString[numberString.length - 2] === ".") {
                setIsFloat(true);
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
              setNumber(value);
            };

            if (operand2 !== null) {
              deleteDigit(setOperand2, operand2);
              return null;
            }

            if (operand1) {
              deleteDigit(setOperand1, operand1);
            }
          }}
        >
          <Backspace />
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            calculateResult("=");
          }}
        >
          =
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(3);
          }}
        >
          3
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(6);
          }}
        >
          6
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(9);
          }}
        >
          9
        </button>
        <button
          type="button"
          className={`app-cell ${handleSelector("*")}`}
          onClick={() => {
            calculateResult("*");
          }}
        >
          <Multiply />
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(2);
          }}
        >
          2
        </button>
        <button
          type="button"
          className="app-cell"
          value="5"
          onClick={() => {
            handleClick(5);
          }}
        >
          5
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(8);
          }}
        >
          8
        </button>
        <button
          type="button"
          className={`app-cell ${handleSelector("/")}`}
          onClick={() => {
            calculateResult("/");
          }}
        >
          /
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(1);
          }}
        >
          1
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(4);
          }}
        >
          4
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(7);
          }}
        >
          7
        </button>
        <button
          type="button"
          className={`app-cell ${handleSelector("-")}`}
          onClick={() => {
            calculateResult("-");
          }}
        >
          -
        </button>
        <button
          type="button"
          className="app-cell app-cell--vertical"
          onClick={() => {
            if (operation && operation !== "=" && operand2 === null) {
              return null;
            }

            if (operand2 !== null) {
              setOperand2(operand2 * -1);
              return null;
            }

            setOperand1(operand1 * -1);
          }}
        >
          +<br />-
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            handleClick(0);
          }}
        >
          0
        </button>
        <button
          type="button"
          className="app-cell"
          onClick={() => {
            if (isFloat) {
              return null;
            }
            if (operation && operation !== "=" && operand2 === null) {
              return null;
            }
            if (operand2 !== null) {
              if (operand2.toString().search(".") !== -1) {
                setIsFloat(true);
              }
              return null;
            }
            if (operand1.toString().search(".") !== -1) {
              setIsFloat(true);
            }
          }}
        >
          .
        </button>
        <button
          type="button"
          className={`app-cell ${handleSelector("+")}`}
          onClick={() => {
            calculateResult("+");
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default App;
