import React from 'react';
import { Switch, Route } from '@modern-js/runtime/router';

import './App.css';
import { Xinput } from './components/Xinput';
import { Xbox } from './components/Xbox';

const Store = React.createContext({
  todos: [],
});

function App() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <div className="container">
          <Xinput />
          <Xbox />
        </div>
      </Route>
      <Route path="*">
        <div>404</div>
      </Route>
    </Switch>
  );
}

export default App;
