import React from 'react';
import Intro from './components/intro/Intro';
import GameBoard from './components/board/GameBoard';
import GameEnd from './components/end/GameEnd';
import { getCategorySets, getAvatars, setCompetitorQuestions } from './helpers/gameHelpers';
import './styles/gamestyles.css';
import './styles/loader.css';

// consider higher order components and hooks
/////////////

// features:
// created with create-react-app
// axios
// localStorage
// API for questions, and for names
// functional and class based components
// pure component
// Bootstrap 4
// SASS
// ES6
//

class Game2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: JSON.parse(window.localStorage.getItem('score') || 0),
			avatar: JSON.parse(window.localStorage.getItem('avatar')),
			username: JSON.parse(window.localStorage.getItem('username')),
			category_sets: JSON.parse(window.localStorage.getItem('category_sets') || '[]'),
			avatar_sets: JSON.parse(window.localStorage.getItem('avatar_sets') || '[]'),
			comp1_qs: JSON.parse(window.localStorage.getItem('comp1_qs') || '[]'),
			comp2_qs: JSON.parse(window.localStorage.getItem('comp2_qs') || '[]'),
			comp3_qs: JSON.parse(window.localStorage.getItem('comp3_qs') || '[]'),
			num_answered: JSON.parse(window.localStorage.getItem('num_answered') || 0),
			loading: false
		};
		this.getData = this.getData.bind(this);
		this.recordAnswer = this.recordAnswer.bind(this);
		this.setUserData = this.setUserData.bind(this);
		this.updateCompetitors = this.updateCompetitors.bind(this);
		this.restartGame = this.restartGame.bind(this);
	}
	componentDidMount() {
		if (this.state.category_sets.length === 0 || this.state.avatar_sets.length === 0) {
			this.setState({ loading: true });
			this.getData();
		}
	}
	async getData() {
		let cats = await getCategorySets();
		let avatars = await getAvatars();
		let competitor_questions = setCompetitorQuestions();
		this.setState(
			(st) => ({
				loading: false,
				category_sets: cats,
				avatar_sets: avatars,
				comp1_qs: competitor_questions,
				comp2_qs: competitor_questions,
				comp3_qs: competitor_questions
			}),
			() => {
				window.localStorage.setItem('category_sets', JSON.stringify(this.state.category_sets));
				window.localStorage.setItem('avatar_sets', JSON.stringify(this.state.avatar_sets));
				window.localStorage.setItem('comp1_qs', JSON.stringify(this.state.comp1_qs));
				window.localStorage.setItem('comp2_qs', JSON.stringify(this.state.comp2_qs));
				window.localStorage.setItem('comp3_qs', JSON.stringify(this.state.comp3_qs));
			}
		);
	}

	recordAnswer(ans) {
		let runningScore = this.state.score;
		let categories = this.state.category_sets;
		for (let i = 0; i < categories.length; i++) {
			if (categories[i].id === ans.cat) {
				let questions = categories[i].questions;
				for (let ii = 0; ii < questions.length; ii++) {
					if (questions[ii].id === ans.id) {
						ans.isCorrect === 'true'
							? (runningScore += questions[ii].value)
							: (runningScore -= questions[ii].value);
						questions[ii].answered = true;
						questions[ii].isCorrect = ans.isCorrect;
					}
				}
				categories[i].questions = questions;
			}
		}
		this.setState(
			(st) => ({
				category_sets: categories,
				score: runningScore,
				num_answered: this.state.num_answered + 1
			}),
			() => {
				window.localStorage.setItem('category_sets', JSON.stringify(this.state.category_sets));
				window.localStorage.setItem('score', JSON.stringify(this.state.score));
				window.localStorage.setItem('num_answered', JSON.stringify(this.state.num_answered));
			}
		);
		this.updateCompetitors();
	}
	updateCompetitors() {
		let competitors = [ ...this.state.avatar_sets ];

		let comp_questions = [ [ ...this.state.comp1_qs ], [ ...this.state.comp2_qs ], [ ...this.state.comp3_qs ] ];

		// who will be smart?
		for (let k = 0; k < competitors.length; k++) {
			let smarty = Math.floor(Math.random() * 2);
			let curScore = competitors[k].score;

			// pick a random question for each competitor, calc if correct
			// if smarty = 0, correct 4/5 times (80%)
			// if smarty = 1, correct 3/4 times (75%)
			//console.log(comp_questions[k]);
			let rand_q = Math.floor(Math.random() * comp_questions[k].length);

			let smarty_points = comp_questions[k][rand_q];

			let smarty_right = 0;

			smarty === 0
				? (smarty_right = Math.floor(Math.random() * 5))
				: (smarty_right = Math.floor(Math.random() * 4));

			smarty_right !== 0 ? (curScore += Number(smarty_points)) : (curScore -= Number(smarty_points));

			comp_questions[k].splice(rand_q, 1);
			competitors[k].score = curScore;
		}
		this.setState(
			(st) => ({
				avatar_sets: competitors,
				comp1_qs: comp_questions[0],
				comp2_qs: comp_questions[1],
				comp3_qs: comp_questions[2]
			}),
			() => {
				window.localStorage.setItem('avatar_sets', JSON.stringify(this.state.avatar_sets));
				window.localStorage.setItem('comp1_qs', JSON.stringify(this.state.comp1_qs));
				window.localStorage.setItem('comp2_qs', JSON.stringify(this.state.comp2_qs));
				window.localStorage.setItem('comp3_qs', JSON.stringify(this.state.comp3_qs));
			}
		);
	}
	setUserData(user) {
		const contestants = this.state.avatar_sets.filter((val) => val.avatarImg !== user.avatar);
		let user_name = user.username.length >= 16 ? user.username.substr(0, 15) + '...' : user.username;
		this.setState(
			(st) => ({
				avatar: user.avatar,
				username: user_name,
				avatar_sets: contestants
			}),
			() => {
				window.localStorage.setItem('avatar', JSON.stringify(user.avatar));
				window.localStorage.setItem('username', JSON.stringify(user.username));
				window.localStorage.setItem('avatar_sets', JSON.stringify(contestants));
			}
		);
	}
	restartGame() {
		// reset local storage
		window.localStorage.clear();
		// reset state
		this.setState({
			score: 0,
			avatar: null,
			username: null,
			category_sets: [],
			avatar_sets: [],
			comp1_qs: [],
			comp2_qs: [],
			comp3_qs: [],
			num_answered: 0,
			loading: false
		});

		this.setState({ loading: true });
		this.getData();
	}
	render() {
		const { category_sets, loading, avatar, username, avatar_sets, score, num_answered } = this.state;
		if (loading) {
			return (
				<div className="loader">
					<div className="load-1">
						<div className="line" />
						<div className="line" />
						<div className="line" />
					</div>
				</div>
			);
		}
		if (this.state.avatar === null) {
			return <Intro setUserData={this.setUserData} />;
		}
		if (this.state.num_answered < 16) {
			return (
				<GameBoard
					avatar={avatar}
					username={username}
					avatar_sets={avatar_sets}
					category_sets={category_sets}
					score={score}
					num_answered={num_answered}
					recordAnswer={this.recordAnswer}
					restart={this.restartGame}
				/>
			);
		}
		return (
			<GameEnd
				avatar={avatar}
				username={username}
				avatar_sets={avatar_sets}
				score={score}
				restart={this.restartGame}
			/>
		);
	}
}

export default Game2;
