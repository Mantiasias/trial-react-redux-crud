import React from 'react'
import { HashRouter , Switch, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import NotFound from './components/NotFound/NotFound'

export function getRoutes() {
  return (
    <HashRouter>
      <Main>
        <Switch>
          <Route exact path="/" component={ProductsContainer}/>,
          <Route exact path="/products/create" component={ProductsContainerCreate}/>,
          <Route exact path="/products/update" component={ProductsContainer}/>,
          <Route exact path="/products/delete" component={ProductsContainer}/>,
          <Route path="*" component={NotFound}/>,
        </Switch>
      </Main>
    </HashRouter>
  )
}

export default getRoutes
