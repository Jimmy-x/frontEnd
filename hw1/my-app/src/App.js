import logo from './logo.svg';
import './App.css';
import HCButtons from './hc_button';
import HCDisableElevation from './hc_bright_button';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hello Shit
        </a>
        <HCButtons></HCButtons>
        <HCDisableElevation></HCDisableElevation>
      </header>
    </div>
  );
}

export default App;
