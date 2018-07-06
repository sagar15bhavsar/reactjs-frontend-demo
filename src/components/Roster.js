import React from 'react'
import { Switch, Route } from 'react-router-dom'
import CheckoutScreen from './CheckoutScreen'
import CartScreen from './CartScreen'

// The Roster component matches one of two different routes
// depending on the full pathname
const Roster = () => (
  <Switch>
    <Route exact path='/cart' component={CheckoutScreen}/>
    <Route path='/checkout' component={CartScreen}/>
  </Switch>
)

export default Roster