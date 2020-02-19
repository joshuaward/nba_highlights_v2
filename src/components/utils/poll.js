import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { URL_TEAMS } from './paths';

class Poll extends Component {
	state = {
		pollTeams: [],
	}

	getPoll = () => {
		axios.get(`${URL_TEAMS}?poll=true&_sort=count&_order=desc`)
			.then(response => {
				this.setState({
					pollTeams: response.data
				})
			})
	}

	componentDidMount() {
		this.getPoll()
	}

	showPoll() {
		const position = ['1st','2nd','3rd'];
		return this.state.pollTeams.map((item,i) => (
			<div key={i} className="poll_item" onClick={() => this.addCount(item.count,item.id)}>
				<img alt={item.name} src={`/images/teams/${item.logo}`} />
				<h4>{position[i]}</h4>
				<div>
					{item.count} Votes
				</div>
			</div>
		))
	}

	clearError() {
		this.setState({
			error: false
		})
	}

	addCount(count, id) {
		let getCookie = cookie.load('poll');
		if(getCookie === undefined) {
			axios(`${URL_TEAMS}/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({count: count + 1})
			}).then(response => {
				cookie.save('poll', true);
				this.getPoll();
			})
		} else {
			this.setState({
				error: true
			})
			setTimeout(() => {
				this.clearError()
			},3000)
		}
	}

	render() {
		return (
			<div>
				<div className="home_poll">
					<h3>Who will be the next Champion?</h3>
					<div className="poll_container">
						{this.showPoll()}
					</div>
					{
						this.state.error ?
							<div>
								<p className="error">Sorry, you already voted!</p>
							</div>
						: null
					}
				</div>
			</div>
		)
	}
}

export default Poll;