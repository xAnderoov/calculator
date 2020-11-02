import "./App.css";
import {ReactComponent as Backspace} from "./backspace.svg"
import {ReactComponent as Multiply} from "./multiply.svg"

function App() {
  return (
    <div className="app">
      <div className="app-wrapper">
        <div className="app-result">0</div>
        <button type="button" className="app-cell">C</button>
        <button type="button" className="app-cell">AC</button>
        <button type="button" className="app-cell">
          <Backspace />
        </button>
        <button type="button" className="app-cell">=</button>
        <button type="button" className="app-cell">3</button>
        <button type="button" className="app-cell">6</button>
        <button type="button" className="app-cell">9</button>
        <button type="button" className="app-cell">
          <Multiply />
        </button>
        <button type="button" className="app-cell">2</button>
        <button type="button" className="app-cell">5</button>
        <button type="button" className="app-cell">8</button>
        <button type="button" className="app-cell">/</button>
        <button type="button" className="app-cell">1</button>
        <button type="button" className="app-cell">4</button>
        <button type="button" className="app-cell">7</button>
        <button type="button" className="app-cell">-</button>
        <button type="button" className="app-cell app-cell--vertical">
          +<br />-
        </button>
        <button type="button" className="app-cell">0</button>
        <button type="button" className="app-cell">.</button>
        <button type="button" className="app-cell">+</button>
      </div>
    </div>
  );
}

export default App;
