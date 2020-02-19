import React, { Component } from 'react';
import Modal from 'react-modal';

class TeamModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: false
		}

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	handleOpenModal() {
		this.setState({
			modalIsOpen: true
		})
	}

	handleCloseModal() {
		this.props.clearModal();
		this.setState({
			modalIsOpen: false
		})
	}

	// componentWillReceiveProps(nextProps) {
	// 	if(nextProps.team !== null) {
	// 		this.setState({
	// 			modalIsOpen: true
	// 		})
	// 	}
	// }

	static getDerivedStateFromProps(props, state) {
		if(props.team !== null) {
			return {
				modalIsOpen: true
			}
		}
		return null
	}

	render() {
		const team = this.props.team;
		return(
			<div>
				<Modal
					isOpen={this.state.modalIsOpen}
					ariaHideApp={false}
				>
					<button onClick={this.handleCloseModal}>Close Modal</button>
					{
						team ?
							<div>
								<h3>{team.name}</h3>
								<hr />
								<div>
									<div className="modal_content" dangerouslySetInnerHTML={{__html: team.content}}></div>
								</div>
							</div>
						: null
					}
				</Modal>
			</div>
		)
	}
}

export default TeamModal;