import './App.css';
import { XButton } from './components/xjs_button';

function App() {
  return (
    <XButton
      color="red"
      onClick={() => {
        alert('Hello SJTU');
      }}>
      Hello
    </XButton>
  );
}

export default App;
