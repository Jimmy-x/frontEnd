import { Switch, Route } from '@modern-js/runtime/router';

import './App.css';
import { Xinput } from './components/Xinput';
import Xlabel from './components/Xlabel';

const App = () => (
  <Switch>
    <h1 id="todos">todos</h1>
    <Xlabel />
  </Switch>
);

export default App;
