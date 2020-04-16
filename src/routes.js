import React from 'react'
import { HashRouter , Switch, Route } from 'react-router-dom'
import Main from './components/Main/Main'
import ProductsContainer from './components/Products/ProductsContainer'
import NotFound from './components/NotFound/NotFound'
import ProductsContainerUpdate from './components/Products/ProductsContainerUpdate'
import ProductsContainerCreate from './components/Products/ProductsContainerCreate'

export function getRoutes() {
  return (
    <HashRouter>
      <Main>
        <Switch>
          <Route exact path="/" component={ProductsContainer}/>,
          <Route exact path="/products/create" component={ProductsContainerCreate}/>,
          <Route exact path="/products/update/:id" component={ProductsContainerUpdate}/>,
          <Route path="*" component={NotFound}/>,
        </Switch>
      </Main>
    </HashRouter>
  )
}

export default getRoutes
