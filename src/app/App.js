import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MapScreen from './screens/MapScreen';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MapScreen} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;