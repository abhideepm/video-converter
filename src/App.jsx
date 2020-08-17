import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Convert from './Convert'
import Main from './Main'

const App = () => {
	return (
		<Router>
			<Switch>
				<Route path="/" exact component={Main}></Route>
				<Route path="/convert" exact component={Convert}></Route>
			</Switch>
		</Router>
	)
}

export default App
