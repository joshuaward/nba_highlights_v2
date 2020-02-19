import React, { Component } from 'react';
import axios from 'axios';
import { URL_SUBS } from './paths';

class Subscriptions extends Component {
	state = {
		email: '',
		error: false,
		success: false,
		alreadyIn: false,
	}

	onChangeInput = (e) => {
		this.setState({
			email: e.target.value
		})
	}

	saveSubscription = (email) => {
		axios.get(`${URL_SUBS}?email=${email}`)
			.then(response => {
				if(!response.data.length) {
					axios(URL_SUBS, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						data: JSON.stringify({email})
					}).then(response => {
						this.setState({
							email: '',
							success: true
						})
						this.clearMessages()
					})
				} else {
					this.setState({
						email: '',
						alreadyIn: true
					})
					this.clearMessages()
				}
			})
	}

	clearMessages = () => {
		setTimeout(() => {
			this.setState({
				error: false,
				success: false,
				alreadyIn: false
			})
		},2000)
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let email = this.state.email;
		let regex = /\S+@\S+\.\S+/;

		if(regex.test(email)) {
			this.saveSubscription(email)
		} else {
			this.setState({
				error: true
			})
			this.clearMessages()
		}
	}

	render() {
		const state = this.state;
		return(
			<div className="subscribe_panel">
				<h3>Subscribe to Us</h3>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input value={state.email} onChange={this.onChangeInput} type="text" placeholder="email@address.com" />
						<div className={state.error ? 'error show' : 'error'}>Check your email.</div>
						<div className={state.success ? 'success show' : 'success'}>Thank you!</div>
						<div className={state.alreadyIn ? 'success show' : 'success'}>You have already subscribed.</div>
					</form>
				</div>
				<small>
					Pellentesque habitant morbi tristique senectus et netus et malesuada tincidunt condimentum fames ac turpis egestas.
				</small>
			</div>
		)
	}
}

export default Subscriptions;