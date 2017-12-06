import React, { Component } from 'react';
import Modal from 'react-modal';

import '../styles/Modal.css'

class PopupModal extends Component {
	componentWillMount() {
		//set App Element for Modal
	    Modal.setAppElement('body');
	}
	render() {
		//render content of Modal
		return (
			<Modal
				isOpen={this.props.modalIsOpen}
				onAfterOpen={this.props.afterOpenModal}
				onRequestClose={this.props.closeModal}
				className="Modal col-11 col-sm-6 col-md-5 text-center"
				overlayClassName="Overlay"
	        >
	        	<button onClick={this.props.closeModal} className="close"><span aria-hidden="true">&times;</span></button>
				<h4 className="text-center">Error</h4>
				<p>{this.props.message}</p>
	        </Modal>
		);
	}
}

export default PopupModal;