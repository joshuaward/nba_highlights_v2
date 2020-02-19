import React, { Component } from 'react';
import axios from 'axios';
import { URL_TEAMS } from '../utils/paths';

import { 
	CSSTransition,
	TransitionGroup 
} from 'react-transition-group';

import TeamModal from './modal';

class Teams extends Component {

	state = {
		teams: [],
		filtered: [],
		team: null,
		keyword: ''
	}

	componentDidMount() {
		axios.get(URL_TEAMS)
			.then(response => {
				this.setState({
					teams: response.data,
					filtered: response.data
				})
			})
	}

	clearModal = () => {
		this.setState({
			team: null
		})
	}

	showModalTeam = (data) => {
		this.setState({
			team: data
		})
	}

	renderList = (filtered) => (
		filtered.map((item,i)=>(
			<CSSTransition
				key={i}
				timeout={500}
				classNames="fade"
			>
				<div
					className="team_item"
					onClick={() => this.showModalTeam(item)}
				>
					<img alt={item.name} src={`/images/teams/${item.logo}`}/>
				</div>
			</CSSTransition>
		))
	)

	searchTerm = (e) => {
		const keyword = e.target.value;
		if(keyword !== '') {
			const list = this.state.teams.filter(item => {
				return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
			});
			this.setState({
				filtered: list,
				keyword
			});
		} else {
			this.setState({
				filtered: this.state.teams,
				keyword
			})
		}

	}


	render() {
		return(
			<div className="teams_component">
				<div className="teams_input">
					<input 
						type="text" 
						value={this.state.keyword} 
						onChange={e => this.searchTerm(e)} 
						placeholder="Search for a Team" />
				</div>
				<div className="container teams_container">
					<TransitionGroup component="span">
						{this.renderList(this.state.filtered)}
					</TransitionGroup>
				</div>
				<TeamModal team={this.state.team} clearModal={() => this.clearModal()} />
			</div>
		)
	}
}

export default Teams;