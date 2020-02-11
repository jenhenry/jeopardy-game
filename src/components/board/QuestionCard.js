import React from 'react';

class QuestionCard extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.renderCard = this.renderCard.bind(this);
	}
	handleClick() {
		this.props.handleClick(this.props.id, this.props.catId);
	}

	renderCard() {
		const { value, id, correct, answered } = this.props;
		if (answered) {
			return (
				<div>
					{correct === 'true' ? (
						<div className='QuestionCard shadow-sm my-2 rounded-lg isCorrect_true' id={id}>
							<i className='fas fa-check-circle' />
							{value}
						</div>
					) : (
						<div className='QuestionCard shadow-sm my-2 rounded-lg isCorrect_false' id={id}>
							<i className='fas fa-times-circle' />
							{value}
						</div>
					)}
				</div>
			);
		} else {
			return (
				<div>
					<div className='QuestionCard shadow-sm my-2 rounded-lg' id={id} onClick={this.handleClick}>
						<i class='fas fa-question-circle' />
						{value}
					</div>
				</div>
			);
		}
	}

	render() {
		return this.renderCard();
	}
}

export default QuestionCard;
