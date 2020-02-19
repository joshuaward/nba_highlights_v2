import React, { Component } from 'react';

// components
import HomeSlider from './slider';
import Subscriptions from '../utils/subscribe';
import HomeArticles from './articles';
import Poll from '../utils/poll';

class Home extends Component {
	render() {
		return(
			<div>
				<HomeSlider />
				<Subscriptions />
				<div className="container">
					<HomeArticles />
				</div>
				<Poll />
			</div>
		)
	}
}

export default Home;