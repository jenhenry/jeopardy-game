import React from 'react';
import IntroAnimation from './IntroAnimation';

let playBtnDisabled = true;

class Intro extends React.Component {
	constructor(props) {
		super(props);
		this.state = { intro: true, avatar: 'avatar1', username: '' };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });

		e.target.value === '' ? (playBtnDisabled = true) : (playBtnDisabled = false);
	}
	handleSubmit(e) {
		e.preventDefault();
		this.props.setUserData({ avatar: this.state.avatar, username: this.state.username });
	}
	componentDidMount() {
		this.timeoutHandle = setTimeout(() => {
			this.setState({ intro: false });
		}, 11000);
	}

	componentWillUnmount() {
		clearTimeout(this.timeoutHandle);
	}

	render() {
		return (
			<section className="bg-info">
				{this.state.intro ? (
					<IntroAnimation />
				) : (
					<div id="picker" className="full-height animated fadeIn">
						<h1 className="text-center title">SORT OF JEOPARDY!</h1>
						<div className="container border rounded-lg w-50">
							<form className="m-3" onChange={this.handleChange} onSubmit={this.handleSubmit}>
								<div className="form-group">
									<div className="mb-2">
										<strong>Choose Your Avatar:</strong>
									</div>
									<div className="form-check form-check-inline mr-5">
										<input
											className="form-check-input"
											type="radio"
											name="avatar"
											id="avatar_1"
											value="avatar1"
											defaultChecked
										/>
										<label className="form-check-label" htmlFor="avatar_1">
											<div className="avatar avatar1 rounded-circle bg-light" />
										</label>
									</div>
									<div className="form-check form-check-inline mr-5">
										<input
											className="form-check-input"
											type="radio"
											name="avatar"
											id="avatar_2"
											value="avatar2"
										/>
										<label className="form-check-label" htmlFor="avatar_2">
											<div className="avatar avatar2 rounded-circle bg-light" />
										</label>
									</div>
									<div className="form-check form-check-inline mr-5">
										<input
											className="form-check-input"
											type="radio"
											name="avatar"
											id="avatar_3"
											value="avatar3"
										/>
										<label className="form-check-label" htmlFor="avatar_3">
											<div className="avatar avatar3 rounded-circle bg-light" />
										</label>
									</div>
									<div className="form-check form-check-inline">
										<input
											className="form-check-input"
											type="radio"
											name="avatar"
											id="avatar_4"
											value="avatar4"
										/>
										<label className="form-check-label" htmlFor="avatar_4">
											<div className="avatar avatar4 rounded-circle bg-light" />
										</label>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="username">
										<strong>Enter Your Name:</strong>
									</label>
									<input
										type="text"
										name="username"
										className="form-control"
										placeholder={this.state.username}
									/>
								</div>
								<div id="playBtn">
									<button
										className="game-btn btn btn-info badge-pill px-3 shadow-sm"
										disabled={playBtnDisabled}
									>
										Ready To Play!
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
			</section>
		);
	}
}

export default Intro;
