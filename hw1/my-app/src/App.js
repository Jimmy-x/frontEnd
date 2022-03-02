import logo from './logo.svg';
import './App.css';
import HCDisableElevation from './components/hc_bright_button';
import XBasicMenu from './components/xjs_menu';
import XCustomizedMenus from './components/xjs_options';
import XAutoGrid from './components/xjs_grid';

function App() {
  return (

    <div className="App">
      <XAutoGrid></XAutoGrid>
      <img src="background.jpg" width={"100%"}></img>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Made with  <code>React</code>
        </p>
        <a
          className="App-link"
          href="https://regrocery.co/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click Here to go to the original page
        </a>
        <p>
          徐继晟 519021910324
        </p>
        
        <HCDisableElevation></HCDisableElevation>
      </header>
    </div>
  );
}

export default App;
