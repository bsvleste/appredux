import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './page/Home';
import Carrinho from './page/Carrinho';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/cart" component={Carrinho} />
    </Switch>
  );
}
