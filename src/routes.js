import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// components
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Article from './components/articles';
import Teams from './components/teams';

const Routes = () => (
	<BrowserRouter>
		<Header />
			<Switch>
				<Route path="/article/:id" component={Article}/>
				<Route path="/teams" component={Teams}/>
				<Route path="/" component={Home}/>
			</Switch>
		<Footer />
	</BrowserRouter>
)

export default Routes;