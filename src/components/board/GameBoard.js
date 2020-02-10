import React from 'react';
import QuestionCard from './QuestionCard';
import GameHeader from '../GameHeader';
import GameEnd from '../end/GameEnd';
import Contestant from './Contestant';
import Question from './Question';

class GameBoard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openQuestion: '',
			openCat: '',
			open: false
		};
		this.calcEnd = this.calcEnd.bind(this);
		this.assembleBoard = this.assembleBoard.bind(this);
		this.assembleContestants = this.assembleContestants.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.restart = this.restart.bind(this);
	}

	handleClick(id, catId) {
		this.setState({ openQuestion: id, openCat: catId, open: true });
	}
	handleClose() {
		this.setState({
			openQuestion: '',
			openCat: '',
			open: false
		});
	}
	getQuestionData(id) {
		let categories = this.props.category_sets;
		for (let j = 0; j < categories.length; j++) {
			let questions = categories[j].questions;
			for (let jj = 0; jj < questions.length; jj++) {
				if (questions[jj].id === id) {
					let answers = questions[jj].answers;
					for (let k = 0; k < answers.length; k++) {
						if (answers[k].isCorrect) {
							return {
								value: questions[jj].value,
								text: questions[jj].text,
								answers: questions[jj].answers,
								catId: categories[j].id,
								correctText: answers[k].text
							};
						}
					}
				}
			}
		}
	}
	restart() {
		this.props.restart();
	}
	assembleContestants() {
		const contestants = this.props.avatar_sets.filter((val) => val.avatarImg !== this.props.avatar);
		return contestants.map((c) => {
			return <Contestant key={c.avatarImg} avatarImg={c.avatarImg} avatarName={c.avatarName} score={c.score} />;
		});
	}

	calcEnd() {
		const { num_answered, avatar, username, avatar_sets, score } = this.props;
		if (num_answered >= 16) {
			return <GameEnd avatar={avatar} username={username} avatar_sets={avatar_sets} score={score} />;
		} else {
			return (
				<div className='GameBoard full-height p-3 bg-info'>
					<GameHeader />
					<div className='row mainboard'>
						<div className='col'>
							<div className={`board container border text-center rounded isQuestion_${this.state.open}`}>
								<div className='row'>
									{this.state.open ? (
										<Question
											id={this.state.openQuestion}
											questionData={this.getQuestionData(this.state.openQuestion)}
											recordAnswer={this.props.recordAnswer}
											handleClose={this.handleClose}
											num_answered={this.props.num_answered}
										/>
									) : (
										this.assembleBoard()
									)}
								</div>
							</div>
						</div>
						<div className='col col-md-4 col-12'>
							<div className='board container border rounded pb-1 contestants'>
								<Contestant avatarImg={avatar} avatarName={username} score={score} />
								{this.assembleContestants()}
							</div>
							<button
								onClick={this.restart}
								className='game-btn game-btn-inline d-flex btn btn-secondary mt-3 mx-auto px-5 pt-2 shadow-sm'
							>
								Start Over
							</button>
						</div>
					</div>
					<div className='row startover'>
						<button
							onClick={this.restart}
							className='game-btn d-flex btn btn-secondary mt-3 mx-auto px-5 pt-2 shadow-sm'
						>
							Start Over
						</button>
					</div>
				</div>
			);
		}
	}

	assembleBoard() {
		const { category_sets } = this.props;

		return category_sets.map((cat) => {
			return (
				<div className='category col-3 p-3' key={cat.id}>
					<div className='category-title d-flex justify-content-center align-items-center'>{cat.title}</div>

					{cat.questions.map((q) => {
						return (
							<QuestionCard
								key={q.id}
								value={q.value}
								id={q.id}
								catId={cat.id}
								handleClick={this.handleClick}
								correct={q.isCorrect}
								answered={q.answered}
							/>
						);
					})}
				</div>
			);
		});
	}

	render() {
		return this.calcEnd();
	}
}

export default GameBoard;
