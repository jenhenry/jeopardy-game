import React from 'react';

let disableBtn = true;
let disableForm = false;

class Question extends React.Component {
	constructor(props) {
		super(props);
		this.state = { userAnswer: false, answered: false };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.setContent = this.setContent.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		// pass up question ID and correct/incorrect
		disableBtn = true;
		disableForm = true;
		this.setState({ answered: true });
		this.props.recordAnswer({
			answered: true,
			isCorrect: this.state.userAnswer,
			id: this.props.id,
			cat: this.props.questionData.catId
		});
	}
	handleClose() {
		disableBtn = true;
		disableForm = false;
		this.props.handleClose();
	}
	handleChange(e) {
		this.setState({ userAnswer: e.target.value });
		disableBtn = false;
	}

	setContent() {
		return (
			<div className="text-left question">
				<form className="p-3" onSubmit={this.handleSubmit} onChange={this.handleChange}>
					<fieldset>
						<div className="topline d-flex">
							<legend className="mb-0">{unescape(this.props.questionData.text)}</legend>
							<div className="points ml-auto w-25 text-right">{this.props.questionData.value} points</div>
						</div>
						<hr className="mb-4" />
						{this.props.questionData.answers.map((ans) => {
							return (
								<div className="form-group form-check custom-control custom-radio mx-5" key={ans.id}>
									<input
										className="form-check-input custom-control-input option"
										type="radio"
										name={this.props.id}
										id={ans.id}
										value={ans.isCorrect}
										disabled={disableForm}
									/>
									<label className="form-check-label custom-control-label" htmlFor={ans.id}>
										{unescape(ans.text)}
									</label>
								</div>
							);
						})}
					</fieldset>
				</form>
				{disableForm ? null : (
					<button
						type="submit"
						className="btn btn-secondary game-btn d-flex ml-auto mr-4 mb-2 px-5 pt-2 shadow-sm"
						onClick={this.handleSubmit}
						disabled={disableBtn}
					>
						Submit
					</button>
				)}
				<div className={`feedback card bg-light w-50 show_${disableForm}`}>
					<div className="card-body">
						<div className="row">
							<div className="col">
								<h5 className={`card-title isCorrect_${this.state.userAnswer}`}>
									<strong>{this.state.userAnswer === 'true' ? 'You got it!' : 'Oh no!'}</strong>
								</h5>
							</div>
							<div className="col text-right text-danger">
								<button type="button" className="close" aria-label="Close" onClick={this.handleClose}>
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						</div>

						<p className="card-text">
							The correct answer was "{unescape(this.props.questionData.correctText)}"!
						</p>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return this.setContent();
	}
}

export default Question;
